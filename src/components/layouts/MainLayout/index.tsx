import { PropsWithChildren } from 'react';
import { Navbar } from '@features/navigation/Navbar';
import { Footer } from '@features/navigation/Footer';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};
