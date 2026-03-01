import { Link } from 'react-router-dom';

import ThemeToggle from './ThemeToggle';
import './Header.css';

interface BreadcrumbItem {
  title: string;
  path: string;
}

interface HeaderProps {
  onMenuClick: () => void;
  breadcrumb?: BreadcrumbItem[];
}

export default function Header({ onMenuClick, breadcrumb = [] }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button className="menu-toggle" onClick={onMenuClick} aria-label="메뉴 열기">
            <span className="hamburger"></span>
          </button>
          {breadcrumb.length > 0 && (
            <nav className="breadcrumb">
              <Link to="/" className="breadcrumb-home">
                🏠
              </Link>
              {breadcrumb.map((item, index) => (
                <span key={index} className="breadcrumb-separator">
                  /
                </span>
              ))}
              {breadcrumb.map((item, index) => (
                <span
                  key={index}
                  className={`breadcrumb-item ${index === breadcrumb.length - 1 ? 'active' : ''}`}
                >
                  {index < breadcrumb.length - 1 ? (
                    <Link to={item.path}>{item.title}</Link>
                  ) : (
                    <span>{item.title}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
        </div>
        <div className="header-actions">
          <ThemeToggle />
          <a
            href="https://developer.mozilla.org/ko/docs/Web/JavaScript"
            target="_blank"
            rel="noopener noreferrer"
            className="external-link"
          >
            MDN 문서 🔗
          </a>
        </div>
      </div>
    </header>
  );
}
