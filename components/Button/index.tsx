type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className="border border-gray-300 inline-block rounded-3xl px-4 py-2 min-w-32">
      {children}
    </button>
  );
}
