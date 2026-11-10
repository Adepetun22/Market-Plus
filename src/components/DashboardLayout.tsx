import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  BellRingIcon,
  InfoIcon,
  MenuIcon,
  SearchIcon,
} from '@animateicons/react/lucide';
import LeftPanel from './Left-Panel';
import BottomNavBar from './BottomNavBar';

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="overview-page">
      <div className="overview-shell">
        <LeftPanel className={sidebarOpen ? 'is-open' : ''} />

        <main className="overview-main">
          <header className="topbar" aria-label="Page header">
            <button className="icon-button menu-toggle" type="button" aria-label="Open menu" onClick={() => setSidebarOpen(true)}>
              <MenuIcon size={20} />
            </button>

            <div className="search-field" role="search">
              <SearchIcon size={18} />
              <input placeholder="Search..." type="text" />
            </div>

            <div className="topbar-actions">
              <button className="icon-button" type="button" aria-label="Notifications">
                <BellRingIcon size={18} />
              </button>
              <button className="icon-button" type="button" aria-label="Help">
                <InfoIcon size={18} />
              </button>
              <div className="avatar" aria-label="User profile">
                <span>AB</span>
              </div>
            </div>
          </header>

          {sidebarOpen && (
            <div className="sidebar-backdrop is-visible" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
          )}

          <Outlet />
        </main>
      </div>

      <BottomNavBar />
    </div>
  );
}

export default DashboardLayout;
