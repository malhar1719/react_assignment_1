import { Badge, Button, Card, Stack } from 'react-bootstrap';
import { FiEdit2, FiEye, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { TaskPriorityBadge, TaskStatusBadge } from './StatusBadge';

export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <Card className="h-100 shadow-sm border-0 task-card">
      <Card.Body className="d-flex flex-column">
        <Card.Title className="task-card-title">{task.title}</Card.Title>
        <Card.Text className="text-muted flex-grow-1">
          {task.description || 'No description'}
        </Card.Text>

        <Stack direction="horizontal" gap={2} className="mb-3 flex-wrap">
          <TaskStatusBadge status={task.status} />
          <TaskPriorityBadge priority={task.priority} />
          <Badge className="pill pill-id">
            #{task.id}
          </Badge>
        </Stack>

        <Stack direction="horizontal" gap={2} className="flex-wrap">
          <Button as={Link} to={`/tasks/${task.id}`} size="sm" variant="light" className="task-action-btn">
            <FiEye className="me-1" />
            View
          </Button>
          <Button size="sm" variant="light" className="task-action-btn" onClick={() => onEdit(task)}>
            <FiEdit2 className="me-1" />
            Edit
          </Button>
          <Button size="sm" variant="light" className="task-action-btn delete" onClick={() => onDelete(task.id)}>
            <FiTrash2 className="me-1" />
            Delete
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}
