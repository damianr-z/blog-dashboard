import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CreateBlogForm from '../features/blogs/CreateBlogForm';
import { useUser } from '@clerk/clerk-react';

function Dashboard() {
  const { user } = useUser();

  if (user) {
    console.log('===== YOUR CLERK USER ID =====');
    console.log('User ID:', user.id);
    console.log('Email:', user.primaryEmailAddress?.emailAddress);
    console.log('==============================');
  }
  return (
    <Row type="vertical">
      <Heading as="h1">New Blog</Heading>
      <CreateBlogForm />
    </Row>
  );
}

export default Dashboard;
