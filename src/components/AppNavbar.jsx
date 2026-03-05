import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AppNavbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="md" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard">
          Task Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/tasks">
              Tasks
            </Nav.Link>
          </Nav>

          {isAuthenticated ? (
            <div className="d-flex align-items-center gap-2 text-white">
              <span className="small">{user?.name}</span>
              <Button variant="outline-light" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button as={Link} to="/login" variant="outline-light" size="sm">
              Login
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
