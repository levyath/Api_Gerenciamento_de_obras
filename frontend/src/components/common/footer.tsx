import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} GEOBRAP. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}