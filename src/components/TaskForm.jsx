import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Stack } from 'react-bootstrap';
import { FiEdit2, FiPlusCircle, FiSave, FiXCircle } from 'react-icons/fi';
import * as yup from 'yup';

const initialState = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
};

const taskSchema = yup.object({
  title: yup.string().trim().min(3, 'Title must be at least 3 characters.').max(80, 'Title must be at most 80 characters.').required('Title is required.'),
  description: yup.string().trim().max(240, 'Description must be at most 240 characters.'),
  status: yup.string().oneOf(['todo', 'in-progress', 'done']).required('Status is required.'),
  priority: yup.string().oneOf(['low', 'medium', 'high']).required('Priority is required.'),
});

export default function TaskForm({ onSubmit, editingTask, onCancelEdit }) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description,
        status: editingTask.status,
        priority: editingTask.priority,
      });
    } else {
      setForm(initialState);
    }
    setErrors({});
  }, [editingTask]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const validatedData = await taskSchema.validate(form, {
        abortEarly: false,
        stripUnknown: true,
      });

      setErrors({});
      onSubmit(validatedData);
      if (!editingTask) setForm(initialState);
    } catch (validationError) {
      const formErrors = {};
      validationError.inner?.forEach((err) => {
        if (err.path && !formErrors[err.path]) {
          formErrors[err.path] = err.message;
        }
      });
      setErrors(formErrors);
    }
  };

  return (
    <Card className="shadow-sm border-0 mb-3 task-form-card">
      <Card.Body>
        <Card.Title className="mb-1 d-flex align-items-center gap-2">
          {editingTask ? <FiEdit2 /> : <FiPlusCircle />}
          {editingTask ? 'Edit Task' : 'Create New Task'}
        </Card.Title>
        <Card.Text className="text-muted mb-3">
          {editingTask
            ? 'Update task details and save your changes.'
            : 'Capture title, description, status, and priority.'}
        </Card.Text>

        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              isInvalid={Boolean(errors.title)}
            />
            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
            <Form.Text className="text-muted">Keep it short and specific.</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              placeholder="Write task details..."
              value={form.description}
              onChange={handleChange}
              rows={4}
              isInvalid={Boolean(errors.description)}
            />
            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
          </Form.Group>

          <Row className="g-3 mb-3">
            <Col md={6}>
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={form.status}
                onChange={handleChange}
                isInvalid={Boolean(errors.status)}
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Label>Priority</Form.Label>
              <Form.Select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                isInvalid={Boolean(errors.priority)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.priority}</Form.Control.Feedback>
            </Col>
          </Row>

          <Stack direction="horizontal" gap={2}>
            <Button type="submit" variant="dark" className="d-flex align-items-center px-3">
              <FiSave className="me-1" />
              {editingTask ? 'Update Task' : 'Add Task'}
            </Button>
            {editingTask && (
              <Button type="button" variant="outline-secondary" onClick={onCancelEdit}>
                <FiXCircle className="me-1" />
                Cancel
              </Button>
            )}
          </Stack>
        </Form>
        {editingTask && (
          <Form.Text className="text-muted mt-2 d-block">
            Editing mode is active.
          </Form.Text>
        )}
      </Card.Body>
    </Card>
  );
}
