import { Spinner } from 'react-bootstrap';

export default function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="d-flex align-items-center gap-2 py-3">
      <Spinner animation="border" size="sm" />
      <span>{message}</span>
    </div>
  );
}
