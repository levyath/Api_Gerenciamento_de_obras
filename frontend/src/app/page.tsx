"use client";

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Página Inicial</h1>
      <p className="mb-4">conteúdo principal. dentro do maincontent.</p>
      <p className="mb-4">header, sidebar e footer visível em todas as pag</p>
      <Button onClick={() => alert('alert!')}>
        teste botao Shadcn
      </Button>
    </div>
  );
}