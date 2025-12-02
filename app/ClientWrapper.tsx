'use client';

import { Toaster } from 'react-hot-toast';
import Header from '../components/Header';
import { Providers } from '../components/Providers';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Providers>
      <Header />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </Providers>
    <Toaster position="bottom-center" />
    </>
  );
}
