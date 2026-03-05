import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';

export default function NotFoundPage() {
  return (
    <PageContainer>
      <h1>404 - Not Found</h1>
      <Button as={Link} to="/dashboard">
        Back to Dashboard
      </Button>
    </PageContainer>
  );
}
