import './globals.css'
import { Inter } from 'next/font/google'
import {NavBar, Footer} from "@shared-components/index";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Flexibble",
  description: "Showcase and discover remarkable developer projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <NavBar/>
      <main>
        {children}
      </main>
      <Footer/>
      </body>
    </html>
  )
}
