import { RiDraftLine } from 'react-icons/ri';
import { IoLibraryOutline, IoBriefcaseOutline } from 'react-icons/io5';
import { FaRegCalendarCheck } from 'react-icons/fa';

import Stat from './Stat';

function Stats({ blogs, numDays }) {
  const totalBlogs = blogs.length;
  const publishedBlogs = blogs?.filter(
    (blog) => blog.status === 'published',
  ).length;
  const draftedBlogs = blogs?.filter((blog) => blog.status === 'draft').length;
  const archivedBlogs = blogs?.filter(
    (blog) => blog.status === 'archived',
  ).length;
  console.log(archivedBlogs);

  return (
    <>
      <Stat
        title="Total Blogs"
        color="blue"
        icon={<IoLibraryOutline />}
        value={totalBlogs}
      />
      <Stat
        title="Published Blogs"
        color="green"
        icon={<FaRegCalendarCheck />}
        value={publishedBlogs}
      />
      <Stat
        title="Blog Drafts"
        color="yellow"
        icon={<RiDraftLine />}
        value={draftedBlogs}
      />
      <Stat
        title="Archived Blogs"
        color="red"
        icon={<IoBriefcaseOutline />}
        value={archivedBlogs}
      />
    </>
  );
}

export default Stats;
