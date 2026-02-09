import TableOps from '../../ui/TableOps';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

function BlogTableOps() {
  return (
    <TableOps>
      <Filter
        filterField="status"
        options={[
          { value: 'all', label: 'All' },
          { value: 'published', label: 'Published' },
          { value: 'draft', label: 'Draft' },
          { value: 'archived', label: 'Archived' },
        ]}
      />

      <SortBy
        options={[
          { value: 'created_at-newest', label: 'Sort by date (newest first)' },
          { value: 'created_at-oldest', label: 'Sort by date (oldest first)' },
        ]}
      />
    </TableOps>
  );
}

export default BlogTableOps;
