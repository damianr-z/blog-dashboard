import { supabaseUrl } from './supabase';
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

export async function createEditBlog(newBlog, supabaseClient, id) {
  const hasImagePath =
    typeof newBlog.image === 'string' && newBlog.image.startsWith('http');
  const imageName = `${Math.random()}-${newBlog.image.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = hasImagePath
    ? newBlog.image
    : `${supabaseUrl}/storage/v1/object/public/posts-images/${imageName}`;

  // Create / edit blog
  let query = supabase.from('blogs');

  // create new blog
  if (!id) query = query.insert([{ ...newBlog, image: imagePath }]);

  // edit blog
  // when updating data there is no need to insert a new array
  if (id) query = query.update({ ...newBlog, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error('blog could not be created');
  }

  // if the image is already a url, return the data
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from('posts-images')
    .upload(imageName, newBlog.image);

  if (storageError) {
    await supabase.from('blogs').delete().eq('id', data.id);
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

export async function deleteBlog(id, supabaseClient) {
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
