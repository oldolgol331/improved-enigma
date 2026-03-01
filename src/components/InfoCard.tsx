import './InfoCard.css';

interface InfoCardProps {
  type?: 'info' | 'warning' | 'tip' | 'note';
  title?: string;
  children: React.ReactNode;
}

export default function InfoCard({ type = 'info', title, children }: InfoCardProps) {
  const icons = {
    info: 'ℹ️',
    warning: '⚠️',
    tip: '💡',
    note: '📝',
  };

  return (
    <div className={`info-card ${type}`}>
      <div className="info-card-header">
        <span className="info-card-icon">{icons[type]}</span>
        <span className="info-card-title">{title || type.toUpperCase()}</span>
      </div>
      <div className="info-card-content">{children}</div>
    </div>
  );
}
