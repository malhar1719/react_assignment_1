import { Badge, Button, Card, Stack } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import PageContainer from '../components/PageContainer';
import { TaskPriorityBadge, TaskStatusBadge } from '../components/StatusBadge';

export default function TaskDetailPage({ tasks, loading, error, getTaskById }) {
  const { id } = useParams();

  if (loading) {
    return (
      <PageContainer>
        <LoadingState message="Loading task..." />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ErrorState message={error} />
      </PageContainer>
    );
  }

  const task = getTaskById(id);

  if (!tasks.length || !task) {
    return (
      <PageContainer>
        <h1>Task Not Found</h1>
        <Button as={Link} to="/tasks" variant="primary">
          Back to Tasks
        </Button>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <h1 className="mb-3">Task Detail</h1>
      <Card className="shadow-sm border-0 mb-3">
        <Card.Body>
          <Card.Title>{task.title}</Card.Title>
          <Card.Text className="text-muted">{task.description || 'No description'}</Card.Text>
          <Stack direction="horizontal" gap={2} className="flex-wrap">
            <TaskStatusBadge status={task.status} />
            <TaskPriorityBadge priority={task.priority} />
            <Badge bg="light" text="dark">
              #{task.id}
            </Badge>
          </Stack>
        </Card.Body>
      </Card>
      <Button as={Link} to="/tasks" variant="primary">
        Back to Tasks
      </Button>
    </PageContainer>
  );
}
