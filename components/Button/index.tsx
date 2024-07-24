import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className="inline-block min-w-32 rounded-3xl border border-gray-300 px-4 py-2">
      {children}
    </button>
  );
}
