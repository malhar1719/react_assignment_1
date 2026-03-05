import { Alert } from 'react-bootstrap';

export default function ErrorState({ message }) {
  if (!message) return null;
  return <Alert variant="danger">{message}</Alert>;
}
