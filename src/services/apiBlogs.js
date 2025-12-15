import { supabaseUrl } from './supabase';
import { PAGE_SIZE } from '../utils/constants';
import { DEFAULT_IMAGE_URL } from '../utils/constants';

//////////////////// Get all blogs ////////////////////////

export async function getBlogs(supabaseClient, { filter, sortBy, page } = {}) {
  let query = supabaseClient
    .from('blogs')
    .select('*, author(id, name)', { count: 'exact' });

  // ✅ Apply filtering - match your Filter component options
  if (filter && filter !== 'all') {
    // console.log('🔍 Applying filter:', filter);
    query = query.eq('status', filter);
  }

  // ✅ Apply sorting - match your SortBy component options
  if (sortBy) {
    const [field, direction] = sortBy.split('-');
    const ascending = direction === 'oldest'; // oldest = ascending, newest = descending
    // console.log('🔍 Applying sort:', { field, direction, ascending });
    query = query.order(field, { ascending });
  }

  // ✅ Apply pagination
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    // console.log('🔍 Applying pagination:', { from, to, page });
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.log('❌ Query error:', error);
    throw new Error('blogs could not be loaded');
  }

  console.log('✅ Query successful:', {
    dataCount: data?.length,
    totalCount: count,
    firstBlog: data?.[0],
    firstBlogAuthor: data?.[0]?.author, // ✅ Add this
  });
  return { data, count };
}

/////////////////// Get single blog ////////////////////////

export async function getBlog(supabaseClient, id) {
  const { data, error } = await supabaseClient
    .from('blogs')
    .select('*, author(id, name)', { count: 'exact' })
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('blog could not be loaded');
  }

  return data;
}

/////////////////// Create / Edit blog ////////////////////////

export async function createEditBlog(supabaseClient, newBlog, id, clerkUser) {
  if (clerkUser) {
    const { error: authorError } = await supabaseClient.from('author').upsert(
      {
        user_id: clerkUser.id,
        name: `${clerkUser.firstName} ${clerkUser.lastName}`.trim(),
        email: clerkUser.primaryEmailAddress?.emailAddress,
      },
      { onConflict: 'user_id' }
    );

    if (authorError) throw new Error(authorError.message);
  }

  let authorId = null;

  if (clerkUser) {
    const { data: authorData } = await supabaseClient
      .from('author')
      .select('id')
      .eq('user_id', clerkUser.id)
      .single();

    authorId = authorData?.id;
  }

  const hasImagePath =
    newBlog.image &&
    typeof newBlog.image === 'string' &&
    (newBlog.image.startsWith('http') || newBlog.image.startsWith('/'));

  let imagePath = null;
  let imageName = '';

  if (hasImagePath) {
    imagePath = newBlog.image;
  } else if (newBlog.image) {
    imageName = `${Math.random()}-${newBlog.image.name}`.replaceAll('/', '');
    imagePath = `${supabaseUrl}/storage/v1/object/public/posts-images/${imageName}`;
  } else {
    imageName = '';
    imagePath = DEFAULT_IMAGE_URL;
  }

  console.log('🔍 Image handling:', { hasImagePath, imageName, imagePath });

  // ✅ Get author ID by searching for author by name
  let originalAuthorId = null;

  if (newBlog.author && newBlog.author.name) {
    console.log('🔍 Searching for author by name:', newBlog.author.name);

    const { data: authorData } = await supabaseClient
      .from('author')
      .select('id')
      .eq('name', newBlog.author.name.trim())
      .single();

    originalAuthorId = authorData?.id;
  }

  const {
    author, // Remove populated author object: {"name":"Damian "}
    id: blogId, // Remove existing ID for new blogs
    created_at, // Remove system timestamps
    updated_at,
    author_id,
    ...cleanBlogData
  } = newBlog;

  const blogDataToInsert = {
    ...cleanBlogData,
    image: imagePath,
    author: authorId, // ✅ Using clerk user's author ID
    status: newBlog.status?.toLowerCase() || 'draft',
  };

  console.log('🔍 Blog data to insert:', blogDataToInsert);

  // Create / edit blog
  let query = supabaseClient.from('blogs');

  if (!id) query = query.insert([blogDataToInsert]);
  if (id) query = query.update(blogDataToInsert).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log('❌ Database error:', error);
    throw new Error('blog could not be created');
  }

  // if the image is already a url, return the data
  if (hasImagePath || !newBlog.image) return data;

  // Upload image to storage
  const { error: storageError } = await supabaseClient.storage
    .from('posts-images')
    .upload(imageName, newBlog.image);

  if (storageError) {
    await supabaseClient.from('blogs').delete().eq('id', data.id);
    console.log(storageError);
    throw new Error('image could not be uploaded');
  }
  console.log('✅ Blog and image created successfully');
  return data;
}

/////////////////// Update blog status ////////////////////////

export async function updateBlogStatus(supabaseClient, id, status) {
  const { data, error } = await supabaseClient
    .from('blogs')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('blog status could not be updated');
  }
  return data;
}

/////////////////// Delete blog ////////////////////////

export async function deleteBlog(supabaseClient, id, clerkUser) {
  // get the blog data
  const { data: blog } = await supabaseClient
    .from('blogs')
    .select('author')
    .eq('id', id)
    .single();

  // get the current user's author id
  const { data: authorData } = await supabaseClient
    .from('author')
    .select('id')
    .eq('user_id', clerkUser.id)
    .single();

  //check ownership
  if (blog.author !== authorData.id) {
    throw new Error('You can only delete your own blogs');
  }

  //delete blog
  const { data, error } = await supabaseClient
    .from('blogs')
    .delete()
    .eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('blog could not be deleted');
  }

  return { data };
}
