"use client"
import { usePathname } from "next/navigation"
import React, { ReactNode } from "react"
import Sidebar from "./SideBar"
export const LayoutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const pathName = usePathname()
  const showSidebar =
    pathName === "/signup" ||
    pathName === "/signin" ||
    pathName === "/forgot-password" ||
    pathName === "/verify-email"
      ? false
      : true
  return (
    <React.Fragment>
      {showSidebar && <Sidebar />}
      {children}
    </React.Fragment>
  )
}
