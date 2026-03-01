import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import InfoCard from '@components/InfoCard';

describe('InfoCard', () => {
  it('기본 info 타입으로 렌더링된다', () => {
    render(<InfoCard>테스트 내용</InfoCard>);

    expect(screen.getByText('INFO')).toBeInTheDocument();
    expect(screen.getByText('테스트 내용')).toBeInTheDocument();
  });

  it('warning 타입으로 렌더링된다', () => {
    render(<InfoCard type="warning">경고 내용</InfoCard>);

    expect(screen.getByText('WARNING')).toBeInTheDocument();
    expect(screen.getByText('경고 내용')).toBeInTheDocument();
  });

  it('tip 타입으로 렌더링된다', () => {
    render(<InfoCard type="tip">팁 내용</InfoCard>);

    expect(screen.getByText('TIP')).toBeInTheDocument();
    expect(screen.getByText('팁 내용')).toBeInTheDocument();
  });

  it('note 타입으로 렌더링된다', () => {
    render(<InfoCard type="note">노트 내용</InfoCard>);

    expect(screen.getByText('NOTE')).toBeInTheDocument();
    expect(screen.getByText('노트 내용')).toBeInTheDocument();
  });

  it('커스텀 제목이 있으면 제목을 표시한다', () => {
    render(<InfoCard title="커스텀 제목">내용</InfoCard>);

    expect(screen.getByText('커스텀 제목')).toBeInTheDocument();
  });

  it('children 으로 복잡한 콘텐츠를 렌더링할 수 있다', () => {
    render(
      <InfoCard>
        <ul>
          <li>첫 번째 항목</li>
          <li>두 번째 항목</li>
        </ul>
      </InfoCard>
    );

    expect(screen.getByText('첫 번째 항목')).toBeInTheDocument();
    expect(screen.getByText('두 번째 항목')).toBeInTheDocument();
  });
});
