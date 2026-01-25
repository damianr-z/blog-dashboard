import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
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
        icon={<HiOutlineBriefcase />}
        value={totalBlogs}
      />
      <Stat
        title="Published Blogs"
        color="green"
        icon={<HiOutlineBriefcase />}
        value={publishedBlogs}
      />
      <Stat
        title="Blog Drafts"
        color="yellow"
        icon={<HiOutlineBriefcase />}
        value={draftedBlogs}
      />
      <Stat
        title="Archived Blogs"
        color="red"
        icon={<HiOutlineBriefcase />}
        value={archivedBlogs}
      />
    </>
  );
}

export default Stats;
