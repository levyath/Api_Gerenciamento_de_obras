import React from 'react';
import Link from 'next/link';
import { Building2, Users, HardHat, Package, FileText, Factory, ClipboardCheck, ScrollText, Settings } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 text-white p-4 h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-6">GEOBRAP</h2>

      <nav className="flex-grow flex flex-col min-h-0">
        <ul className="flex-grow overflow-auto space-y-2">
          <li>
            <Link href="/obras" className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
              <Building2 className="w-5 h-5" />
              Obras
            </Link>
          </li>
          <li>
            <Link href="/usuarios" className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
              <Users className="w-5 h-5" />
              Usuários
            </Link>
          </li>
          <li>
            <Link href="/equipamentos" className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
              <HardHat className="w-5 h-5" />
              Equipamentos
            </Link>
          </li>
          <li>
            <Link href="/materiais" className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
              <Package className="w-5 h-5" />
              Materiais
            </Link>
          </li>
          <li>
            <Link href="/fornecedores" className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
              <Factory className="w-5 h-5" />
              Fornecedores
            </Link>
          </li>
          <li>
            <Link href="/fiscalizacoes" className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
              <ClipboardCheck className="w-5 h-5" />
              Fiscalizações
            </Link>
          </li>
          <li>
            <Link href="/responsaveis-tecnicos" className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
              <Users className="w-5 h-5" />
              Responsáveis Técnicos
            </Link>
          </li>
          <li>
            <Link href="/relatorios" className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
              <ScrollText className="w-5 h-5" />
              Relatórios
            </Link>
          </li>
          <li>
            <Link href="/configuracoes" className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
              <Settings className="w-5 h-5" />
              Configurações
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}