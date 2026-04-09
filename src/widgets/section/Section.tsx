
import type { ReactNode } from 'react';
import './Section.scss';

interface SectionProps {
  title: string;
  isArchived?: boolean;
  children: ReactNode;
}

export const Section = ({ title, isArchived = false, children }: SectionProps) => {
  return (
    <section className="section">
      <div className="section__header">
        <h2 className={`section__title ${isArchived ? 'section__title--archived' : ''}`}>
          {title}
        </h2>
        <div className="section__divider"></div>
      </div>
      {children}
    </section>
  );
};