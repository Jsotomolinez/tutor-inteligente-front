'use client'

import { Github, Linkedin } from "lucide-react"
import { useEffect, useState } from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Separator } from "@radix-ui/react-separator"
import clsx from "clsx"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/button"
import { addToHistory, getHistory, HistoryItem_ } from "@/logic/history"
import HistoryItem from "./ui/history-item"
import { useAppContext } from "@/context/history-context"

export function AppSidebar() {

  const { items, setItems } = useAppContext();

  useEffect(() => {
    // Cargar historial al montar el componente
    const history = getHistory();
    setItems(history);
  }, []);

  return (
    <Sidebar>
      <div className="flex items-baseline">
        <SidebarHeader className="text-white font-bold pl-5 flex">Tutor inteligente</SidebarHeader>
        <span className="text-muted text-xs">(beta)</span>
      </div>
      <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
        <SidebarMenu>
          {(items ?? []).map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <HistoryItem
                index={(items ?? []).indexOf(item)}
                title={item.title}
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
          ))}
        </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      
      </SidebarContent>
      <SidebarFooter>
          <Separator className={clsx("my-2 w-full h-px bg-muted")} />
          <Separator />
        <div className="flex flex-col items-center justify-between px-5 py-2 gap-2">
          <span className="text-xs text-muted">Desarrollado por Jesús Soto</span>
          <span className="text-xs text-muted">Contacto: <br />jsotomolinez12@gmail.com</span>
          <div className="flex flex-col items-center md:flex-row px-2">
              <Link href="https://www.linkedin.com/in/jesus-alejandro-soto-molinez-0909b5345" target="blank" className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}>
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://github.com/Jsotomolinez" target="blank" className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}>
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          <span className="text-xs text-muted">{`© ${new Date().getFullYear()} Tutor Inteligente`}</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}