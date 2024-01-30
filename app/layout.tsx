// These styles apply to every route in the application
import { Poppins } from "@next/font/google";
import "@/styles/globals.css";

import Toaster from "@/components/toaster";
import AuthStatus from "@/components/auth-status";

import Navbar from '@/components/utilities/navbar'
import Footer from '@/components/utilities/footer';

const poppins = Poppins({ weight: '400', subsets: ['latin'] })



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const AuthStatusDiv = await AuthStatus();
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        <Toaster />
        {AuthStatusDiv}
        {children}
        <Footer />
      </body>
    </html>
  );
}
