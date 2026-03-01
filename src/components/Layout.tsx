import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { findBreadcrumbItems } from '@config/menu';
import Header from './Header';
import Sidebar from './Sidebar';
import TableOfContents from './TableOfContents';
import './Layout.css';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // 현재 경로에 맞는 Breadcrumb 생성
  const breadcrumb = findBreadcrumbItems(location.pathname);

  return (
    <div className="layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {/* 오버레이 - 모바일/태블릿에서만 사이드바가 열려 있을 때 표시 */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
      <div className="layout-content">
        <Header onMenuClick={() => setSidebarOpen(true)} breadcrumb={breadcrumb} />
        <div className="main-wrapper">
          <main className="main-content">
            <Outlet />
          </main>
          {/* 데스크톱에서만 표시되는 TableOfContents 사이드바 */}
          <aside className="toc-sidebar">
            <TableOfContents sidebarMode={true} />
          </aside>
        </div>
      </div>
    </div>
  );
}
