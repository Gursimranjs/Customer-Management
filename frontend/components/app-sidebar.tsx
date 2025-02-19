"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Box, ClipboardList, FileText, Tag } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Dashboard",
    icon: Box,
    href: "/dashboard",
  },
  {
    title: "Orders",
    icon: ClipboardList,
    href: "/orders",
  },
  {
    title: "Invoices",
    icon: FileText,
    href: "/invoices",
  },
  {
    title: "Labels",
    icon: Tag,
    href: "/labels",
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HIRING%20DELIVERY%20DRIVERS%20(COURIER%20POSITION)-TXKLWCIxEaixd4gUDr3g9IZ5J0OVBO.png"
            alt="Logo"
            className="h-8 w-8"
          />
          <span className="text-xl font-semibold">Moving Mountains</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href} className="flex items-center space-x-3 px-3 py-2 text-base">
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarTrigger className="absolute bottom-4 right-4 md:hidden" />
    </Sidebar>
  )
}

