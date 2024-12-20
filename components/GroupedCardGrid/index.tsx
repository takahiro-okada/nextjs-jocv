import React from 'react';
import Card from '@/components/Card';

type CardType = {
  id: string;
  title: string;
  href: string;
  count: string;
  flagSrc?: string;
};

type GroupedCardGridProps = {
  groups: {
    title: string;
    cards: CardType[];
  }[];
};

export default function GroupedCardGrid({ groups }: GroupedCardGridProps) {
  return (
    <div className="space-y-12">
      {groups.map((group, index) => (
        <section key={index} className="mt-8">
          <h3 className="mb-6 text-xl font-bold">{group.title}</h3>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {group.cards.map((card) => (
              <Card key={card.id} {...card} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
