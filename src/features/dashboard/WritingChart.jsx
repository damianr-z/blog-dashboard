import styled from 'styled-components';
import Heading from '../../ui/Heading';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useDarkMode } from '../../context/DarkModeContext';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';

function WritingChart({ blogs, numDays }) {
  const { isDarkMode } = useDarkMode();
  const safeNumDays =
    Number.isFinite(numDays) && numDays > 0 ? Math.floor(numDays) : 1;

  const startDate = subDays(new Date(), safeNumDays - 1);
  const endDate = new Date();

  if (startDate > endDate) return null;

  const allDates = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, 'MMM dd'),
      totalBlogs: (blogs || []).filter((blog) =>
        isSameDay(date, new Date(blog.created_at)),
      ).length,
    };
  });

  return (
    <>
      <Heading as={'h2'}>Writing Activity</Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis tick="blue" dataKey="label" />
          <YAxis tick="indigo" />
          <CartesianGrid strokeDasharray="4" />
          <Area
            dataKey="totalBlogs"
            type="monotone"
            strokeWidth={2}
            name="Total Blogs"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}

export default WritingChart;
