import React from 'react';

interface MainContentProps {
  children: React.ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  return (
    <main className="flex-1 p-6 bg-gray-100 text-gray-900 min-h-full overflow-auto">
      {children}
    </main>
  );
}