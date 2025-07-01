import React from 'react';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import Sidebar from '@/components/common/sidebar';
import MainContent from '@/components/layout-components/maincontent';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex h-full min-h-0 bg-gray-800"> {/*sidebar+main*/}
        <Sidebar />
        <MainContent>
          {children} {/*conteudo*/}
        </MainContent>
      </div>
      <Footer />
    </div>
  );
}