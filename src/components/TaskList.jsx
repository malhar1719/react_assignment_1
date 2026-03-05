import { Alert, Col, Row } from 'react-bootstrap';
import TaskCard from './TaskCard';

export default function TaskList({ tasks, onEdit, onDelete }) {
  if (!tasks.length) {
    return <Alert variant="secondary">No tasks found for current filters.</Alert>;
  }

  return (
    <Row className="g-3">
      {tasks.map((task) => (
        <Col key={task.id} md={6} lg={4}>
          <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} />
        </Col>
      ))}
    </Row>
  );
}
