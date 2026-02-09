export function useBlogStatus(blogs) {
  const totalBlogs = blogs?.length;
  const publishedBlogs = blogs?.filter(
    (blog) => blog.status === 'published',
  ).length;
  const draftedBlogs = blogs?.filter((blog) => blog.status === 'draft').length;
  const archivedBlogs = blogs?.filter(
    (blog) => blog.status === 'archived',
  ).length;

  return { totalBlogs, publishedBlogs, draftedBlogs, archivedBlogs };
}
