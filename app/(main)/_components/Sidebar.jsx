'use client'

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SideBarOption } from "@/Constant/dashbord";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {

  const path=usePathname();
  console.log(path);
  
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center">
        <Image
          src={"/login.jpg"}
          alt="logo"
          width={200}
          height={100}
          className="w-[150px]"
        />
        <Button className="w-full">
          <Plus />
          Create New Interview
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {SideBarOption.map((option, index) => (
              <SidebarMenuItem key={index} className='p-1'>
                <SidebarMenuButton asChild className={`p-5 ${path==option.path && 'bg-blue-500'}`}>
                  <Link href={option.path}>
                    <option.icon />
                    <span className={`text-[16px] ${path==option.path && 'text-primary'}`}>{option.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}