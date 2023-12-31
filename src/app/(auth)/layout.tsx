import AuthNavbar from "@/components/AuthNavbar"
import "../globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <div className={inter.className+"overflow-hidden"}>
        <AuthNavbar />
        {children}
      </div>
    </section>
  )
}
