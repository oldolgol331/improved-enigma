import { NavLink } from 'react-router-dom';

import { menuData } from '@config/menu';
import './Sidebar.css';

interface MenuItem {
  title: string;
  path?: string;
  children?: MenuItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 사이드바 메뉴 렌더링 (재귀적)
 */
function renderMenuItems(items: MenuItem[], onClose: () => void, level: number = 0): React.ReactNode {
  return items.map((item, index) => {
    // 최상위 카테고리 (예: "📚 JavaScript")
    if (level === 0) {
      return (
        <div key={index} className="nav-category">
          <div className="nav-category-title">{item.title}</div>
          {item.children && renderMenuItems(item.children, onClose, level + 1)}
        </div>
      );
    }

    // 섹션 (예: "기초 (Basics)")
    if (item.children && !item.path) {
      return (
        <div key={index} className="nav-section">
          <div className="nav-section-title">{item.title}</div>
          <ul className="nav-list">{item.children.map((child, childIndex) => (
            <li key={childIndex} className="nav-item">
              <NavLink
                to={child.path!}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                {child.title}
              </NavLink>
            </li>
          ))}</ul>
        </div>
      );
    }

    // 단일 메뉴 항목
    return (
      <div key={index} className="nav-item">
        <NavLink
          to={item.path!}
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={onClose}
        >
          {item.title}
        </NavLink>
      </div>
    );
  });
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h1 className="sidebar-logo">
          <span className="logo-icon">🚀</span>
          <span className="logo-text">Dev Learning Hub</span>
        </h1>
        <button className="sidebar-close" onClick={onClose} aria-label="메뉴 닫기">
          ✕
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuData.map((category, index) => (
          <div key={index}>
            <div className="nav-category">
              <div className="nav-category-title">{category.title}</div>
              {category.children && renderMenuItems(category.children, onClose, 1)}
            </div>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p>Interactive Learning Platform</p>
        <p className="footer-version">v1.0.0</p>
      </div>
    </aside>
  );
}
