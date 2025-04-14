import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;