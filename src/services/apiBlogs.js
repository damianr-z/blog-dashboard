import supabase, { supabaseUrl } from './supabase';
import { PAGE_SIZE } from '../utils/constants';

export async function getBlogs(supabaseClient) {
  const { data, error, count } = await supabaseClient
    .from('blogs')
    .select('*, author(name)', { count: 'exact' });

  if (error) {
    console.log(error);
    throw new Error('blogs could not be loaded');
  }

  return { data, count };
}

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

export async function createEditBlog(supabaseClient, newBlog, id) {
  console.log('🔍 Original newBlog:', newBlog);
  console.log('🔍 newBlog.author:', newBlog.author);

  const hasImagePath =
    typeof newBlog.image === 'string' && newBlog.image.startsWith('http');
  const imageName = `${Math.random()}-${newBlog.image.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = hasImagePath
    ? newBlog.image
    : `${supabaseUrl}/storage/v1/object/public/posts-images/${imageName}`;

  // ✅ Get the original blog's author ID from the database
  let originalAuthorId = null;

  // If we're duplicating an existing blog, get its author ID
  if (newBlog.id) {
    const { data: originalBlog } = await supabaseClient
      .from('blogs')
      .select('author')
      .eq('id', newBlog.id)
      .single();
    originalAuthorId = originalBlog?.author;
  } else {
    // Handle author ID for new blogs or when author is provided
    originalAuthorId =
      typeof newBlog.author === 'object'
        ? newBlog.author?.id // If it's a populated object, get the ID
        : newBlog.author;
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
  };

  console.log('🔍 Blog data to insert:', blogDataToInsert);

  // Create / edit blog
  let query = supabaseClient.from('blogs');

  // create new blog
  if (!id) query = query.insert([blogDataToInsert]);

  // edit blog
  // when updating data there is no need to insert a new array
  if (id) query = query.update(blogDataToInsert).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
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
