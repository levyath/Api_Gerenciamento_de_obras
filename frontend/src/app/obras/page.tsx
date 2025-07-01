// frontend/src/app/obras/page.tsx
'use client'; // Marcar como Client Component se for usar hooks ou interatividade

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';

interface Obra {
  id: string;
  nome: string;
  status: string;
}

export default function ObrasPage() {
  const [obras, setObras] = useState<Obra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchObras() {
      try {
        const response = await fetch('/api/obras');
        if (!response.ok) {
          throw new Error('Erro ao buscar obras.');
        }
        const data = await response.json();
        setObras(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchObras();
  }, []);

  if (loading) return <p>Carregando obras...</p>;
  if (error) return <p className="text-red-500">Erro: {error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Obras</h1>
        <Link href="/obras/nova">
          <Button>Nova Obra</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Obras</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input placeholder="Buscar obras..." className="max-w-sm" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {obras.map((obra) => (
                <TableRow key={obra.id}>
                  <TableCell className="font-medium">{obra.id}</TableCell>
                  <TableCell>{obra.nome}</TableCell>
                  <TableCell>{obra.status}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/obras/${obra.id}`}>
                      <Button variant="outline" size="sm" className="mr-2">Ver</Button>
                    </Link>
                    <Link href={`/obras/${obra.id}/editar`}>
                      <Button variant="outline" size="sm">Editar</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          {}
          <p className="text-sm text-gray-500">Total de obras: {obras.length}</p>
        </CardFooter>
      </Card>
    </div>
  );
}