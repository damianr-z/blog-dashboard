import styled from 'styled-components';
import Heading from '../../ui/Heading';
import DashboardBox from './DashboardBox';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useDarkMode } from '../../context/DarkModeContext';
import { useBlogStatus } from './useBlogStatus';

const StyledStatusChart = styled(DashboardBox)`
  border-radius: var(--border-radius-md);
  grid-column: 1 / span 2;
  grid-row: 2 / span 1;
  max-height: min-content;

  /* & > *:first-child {
    margin-bottom: 0rem;
  } */
  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const ChartBox = styled.div``;

// Step 1: get data from staus custom hook

function StatusChart({ blogs }) {
  const { isDarkMode } = useDarkMode();
  const { publishedBlogs, draftedBlogs, archivedBlogs } = useBlogStatus(blogs);

  // Step 2: Create the data structure for the pie chart
  const data = [
    {
      status: 'Published',
      value: publishedBlogs,
      color: 'var(--c-green-400)',
    },
    {
      status: 'Draft',
      value: draftedBlogs,
      color: 'var(--c-yellow-400)',
    },
    {
      status: 'Archived',
      value: archivedBlogs,
      color: 'var(--c-red-400)',
    },
  ];

  return (
    <StyledStatusChart>
      <Heading as="h2">Blogs Status Summary</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="status" // The field to use for labels
            dataKey="value" // The field to use for values
            innerRadius={85}
            outerRadius={110}
            cx="50%"
            cy="50%"
            paddingAngle={3}
          >
            {/* Step 4: Map each data item to a Cell with its color */}
            {data.map((entry) => (
              <Cell
                key={entry.status}
                fill={entry.color}
                stroke={entry.color}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </StyledStatusChart>
  );
}

export default StatusChart;
