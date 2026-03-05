import { Container } from 'react-bootstrap';

export default function PageContainer({ children, size = 'lg' }) {
  return <Container className={`pb-4 ${size === 'sm' ? 'max-w-sm' : ''}`}>{children}</Container>;
}
