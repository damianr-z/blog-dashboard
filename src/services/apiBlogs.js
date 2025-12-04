import { supabaseUrl } from './supabase';
import { PAGE_SIZE } from '../utils/constants';

//////////////////// Get all blogs ////////////////////////

export async function getBlogs(supabaseClient, { filter, sortBy, page } = {}) {
  console.log('🔍 API getBlogs called with:', { filter, sortBy, page });

  let query = supabaseClient
    .from('blogs')
    .select('*, author(name)', { count: 'exact' });

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
    .select('*, author(name)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('blog could not be loaded');
  }

  return data;
}

/////////////////// Create / Edit blog ////////////////////////

export async function createEditBlog(supabaseClient, newBlog, id) {
  console.log('🔍 Original newBlog:', newBlog);
  console.log('🔍 newBlog.author:', newBlog.author);
  console.log('🔍 newBlog.id:', newBlog.id);

  const hasImagePath =
    typeof newBlog.image === 'string' && newBlog.image.startsWith('http');

  const imageName = hasImagePath
    ? ''
    : `${Math.random()}-${newBlog.image.name}`.replaceAll('/', '');

  const imagePath = hasImagePath
    ? newBlog.image
    : `${supabaseUrl}/storage/v1/object/public/posts-images/${imageName}`;

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
    author: originalAuthorId, // ✅ Use the numeric author ID
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
  if (hasImagePath) return data;

  const { error: storageError } = await supabaseClient.storage
    .from('posts-images')
    .upload(imageName, newBlog.image);

  if (storageError) {
    await supabaseClient.from('blogs').delete().eq('id', data.id);
    console.log(storageError);
    throw new Error('image could not be uploaded');
  }

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

export async function deleteBlog(supabaseClient, id) {
  const { data, error, count } = await supabaseClient
    .from('blogs')
    .delete()
    .eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('blog could not be deleted');
  }

  return { data, count };
}
