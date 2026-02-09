import styled from 'styled-components';
import Heading from '../../ui/Heading';
import DashboardBox from './DashboardBox';
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


/// DONE Layout created based on css component added as prop
const StyledWritingChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--c-white-300);
  }
`;

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
    <StyledWritingChart>
      <Heading as={'h2'}>
        Blogs from {format(allDates.at(0), 'MMM dd yyy')} &mdash;{' '}
        {format(allDates.at(-1), 'MMM dd yyy')}{' '}
      </Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            tick={{ fill: 'var(--c-white-400)' }}
            tickLine={{ stroke: 'var(--c-white-700)' }}
            dataKey="label"
          />
          <YAxis
            tick="indigo"
            tick={{ fill: 'var(--c-white-400)' }}
            tickLine={{ stroke: 'var(--c-white-700)' }}
          />
          <CartesianGrid strokeDasharray="5" />
          <Tooltip contentStyle={{ backgroundColor: 'var(--c-black-400)' }} />
          <Area
            dataKey="totalBlogs"
            type="monotone"
            strokeWidth={2}
            name="Total Blogs"
            stroke={isDarkMode ? '#4f46e5' : '#c7d2fe'}
            fill={isDarkMode ? '#c7d2fe' : '#4f46e5'}
            name="Total blogs"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledWritingChart>
  );
}

export default WritingChart;
