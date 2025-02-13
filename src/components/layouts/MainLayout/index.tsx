import { PropsWithChildren } from "react";
import { Navbar } from "@features/navigation/Navbar";
import { Footer } from "@features/navigation/Footer";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}; 