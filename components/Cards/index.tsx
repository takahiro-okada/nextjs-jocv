import React from 'react';
import Card, { CardProps } from '@/components/Card';

type CardGridProps = {
  title: string;
  cards: (CardProps & { key: string })[];
  subtitle?: string;
};

export default function CardGrid({ title, cards, subtitle }: CardGridProps) {
  return (
    <section className="mt-8">
      <h3 className="mb-6 text-2xl font-bold">{title}</h3>
      {subtitle && <p className="mb-4 text-gray-600">{subtitle}</p>}
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.key} {...card} />
        ))}
      </ul>
    </section>
  );
}
