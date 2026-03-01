import { useTheme } from '@hooks/useTheme';
import './ThemeToggle.css';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={`theme-toggle ${className}`}
      onClick={toggleTheme}
      title={`${theme === 'light' ? '다크모드' : '라이트모드'}로 전환`}
      type="button"
      aria-label="테마 토글"
    >
      {theme === 'light' ? (
        <span className="theme-icon">🌙</span>
      ) : (
        <span className="theme-icon">☀️</span>
      )}
    </button>
  );
}
