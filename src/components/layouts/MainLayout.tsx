import { PropsWithChildren } from "react";
import { Navbar, Footer } from "@/components/features/navigation";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}; 