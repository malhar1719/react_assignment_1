import { Col, Form, Row } from 'react-bootstrap';

export default function TaskFilters({ search, onSearchChange, statusFilter, onStatusChange }) {
  return (
    <Row className="mb-3 g-2">
      <Col md={8}>
        <Form.Control
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Col>
      <Col md={4}>
        <Form.Select value={statusFilter} onChange={(e) => onStatusChange(e.target.value)}>
          <option value="all">All Status</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </Form.Select>
      </Col>
    </Row>
  );
}
