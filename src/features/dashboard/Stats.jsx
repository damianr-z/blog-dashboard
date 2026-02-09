import { RiDraftLine } from 'react-icons/ri';
import { IoLibraryOutline, IoBriefcaseOutline } from 'react-icons/io5';
import { FaRegCalendarCheck } from 'react-icons/fa';

import Stat from './Stat';
import { useBlogStatus } from './useBlogStatus';

function Stats({ blogs }) {
  const { totalBlogs, publishedBlogs, draftedBlogs, archivedBlogs } =
    useBlogStatus(blogs);

  return (
    <>
      <Stat
        title="Total Blogs"
        color="blue"
        icon={<IoLibraryOutline />}
        value={totalBlogs}
        link={"all"}
      />
      <Stat
        title="Published Blogs"
        color="green"
        icon={<FaRegCalendarCheck />}
        value={publishedBlogs}
        link={"published"}
      />
      <Stat
        title="Blog Drafts"
        color="yellow"
        icon={<RiDraftLine />}
        value={draftedBlogs}
        link={"draft"}
      />
      <Stat
        title="Archived Blogs"
        color="red"
        icon={<IoBriefcaseOutline />}
        value={archivedBlogs}
        link={"archived"}
      />
    </>
  );
}

export default Stats;
