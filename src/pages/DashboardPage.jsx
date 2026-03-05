import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import PageContainer from '../components/PageContainer';
import { useAuth } from '../hooks/useAuth';

export default function DashboardPage({ tasks = [], loading, error }) {
  const { user } = useAuth();

  const doneCount = tasks.filter((task) => task.status === 'done').length;
  const pendingCount = tasks.filter((task) => task.status !== 'done').length;
  const totalCount = tasks.length;

  return (
    <PageContainer>
      <Card className="shadow-sm border-0 mb-3">
        <Card.Body>
          <Card.Title>Dashboard</Card.Title>
          <Card.Text className="text-muted mb-0">
            Welcome, {user?.name}. Here is your task summary.
          </Card.Text>
        </Card.Body>
      </Card>

      {loading && <LoadingState message="Loading dashboard stats..." />}
      <ErrorState message={error} />

      {!loading && !error && (
        <Row className="g-3 mb-3">
          <Col md={4}>
            <Card className="shadow-sm border-0 stat-card">
              <Card.Body>
                <Card.Text className="text-muted mb-1">Total Tasks</Card.Text>
                <h3 className="mb-0">{totalCount}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm border-0 stat-card">
              <Card.Body>
                <Card.Text className="text-muted mb-1">Done Tasks</Card.Text>
                <h3 className="mb-0">{doneCount}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm border-0 stat-card">
              <Card.Body>
                <Card.Text className="text-muted mb-1">Pending Tasks</Card.Text>
                <h3 className="mb-0">{pendingCount}</h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      <Button as={Link} to="/tasks" variant="dark">
        Manage Tasks
      </Button>
    </PageContainer>
  );
}
