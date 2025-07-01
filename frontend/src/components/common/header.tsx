import React from 'react';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">GEOBRAP - Gerenciamento de Obras Públicas</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-blue-200">Início</a></li>
            <li><a href="#" className="hover:text-blue-200">Sobre</a></li>
            <li><a href="#" className="hover:text-blue-200">Contato</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}