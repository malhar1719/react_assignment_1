import { Badge } from 'react-bootstrap';

const statusLabel = {
  todo: 'To do',
  'in-progress': 'In progress',
  done: 'Done',
};

const priorityLabel = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export function TaskStatusBadge({ status }) {
  return (
    <Badge className={`pill pill-status status-${status}`}>
      {statusLabel[status] || status}
    </Badge>
  );
}

export function TaskPriorityBadge({ priority }) {
  return (
    <Badge className={`pill pill-priority priority-${priority}`}>
      {priorityLabel[priority] || priority}
    </Badge>
  );
}
