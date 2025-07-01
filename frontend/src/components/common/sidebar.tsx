import React from 'react';

export default function Sidebar() {
  return (
    <aside className="w-64 text-white p-4 h-full flex flex-col space-y-4">
      <h2 className="text-xl font-semibold mb-4"></h2>
      <nav className="flex-grow">
        <ul>
          <li><a href="#" className="block py-2 px-4 rounded hover:bg-gray-600">Obras</a></li>
          <li><a href="#" className="block py-2 px-4 rounded hover:bg-gray-600">Usuários</a></li>
          <li><a href="#" className="block py-2 px-4 rounded hover:bg-gray-600">Equipamentos</a></li>
          <li><a href="#" className="block py-2 px-4 rounded hover:bg-gray-600">Materiais</a></li>
          <li><a href="#" className="block py-2 px-4 rounded hover:bg-gray-600">Relatórios</a></li>
          <li><a href="#" className="block py-2 px-4 rounded hover:bg-gray-600">Fornecedores</a></li>
          <li><a href="#" className="block py-2 px-4 rounded hover:bg-gray-600">Fiscalizações</a></li>
        </ul>
      </nav>
    </aside>
  );
}