import { useTableOfContents } from '@hooks/useScrollSpy';
import './TableOfContents.css';

interface TableOfContentsProps {
  title?: string;
  /** 사이드바 모드일 때는 헤더를 숨깁니다 */
  sidebarMode?: boolean;
}

export default function TableOfContents({
  title = '목차',
  sidebarMode = false,
}: TableOfContentsProps) {
  const { activeId, items, scrollTo } = useTableOfContents({
    selector: 'h2, h3',
    rootMargin: '-100px 0px -66%',
  });

  if (items.length === 0) return null;

  return (
    <nav className="table-of-contents">
      {!sidebarMode && (
        <div className="toc-header">
          <span className="toc-icon">📑</span>
          <h4>{title}</h4>
        </div>
      )}
      <ul className="toc-list">
        {items.map((item) => (
          <li
            key={item.id}
            className={`toc-item level-${item.level}`}
            style={{ '--level-indent': (item.level - 2) * 16 } as React.CSSProperties}
          >
            <button
              className={`toc-link ${activeId === item.id ? 'active' : ''}`}
              onClick={() => scrollTo(item.id)}
              type="button"
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
