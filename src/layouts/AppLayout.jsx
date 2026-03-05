import { Outlet } from 'react-router-dom';
import AppNavbar from '../components/AppNavbar';

export default function AppLayout() {
  return (
    <>
      <AppNavbar />
      <Outlet />
    </>
  );
}
