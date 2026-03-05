import { useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const redirectTo = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = (event) => {
    event.preventDefault();
    const ok = login(name);

    if (!ok) {
      setError('Please enter a valid name.');
      return;
    }

    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="login-page-wrap">
      <Card className="shadow-sm border-0 login-card">
        <Card.Body>
          <Card.Title className="mb-1">Login</Card.Title>
          <Card.Text className="text-muted mb-3">Welcome back. Enter your name to continue.</Card.Text>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button type="submit" variant="dark" className="w-100">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
