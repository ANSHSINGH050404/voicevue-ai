"use client";
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
import { Plus, Settings, User, HelpCircle, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useUser } from "@/app/provider";

export function AppSidebar() {
  const path = usePathname();
  const { user, logout } = useUser();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-white/10 bg-gray-1000/90 backdrop-blur-xl text-white w-[17%]"
    >
      <SidebarHeader className="p-6 border-b border-white/10">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold">V</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              VoiceVue
            </span>
          </div>
        </div>
        <Link href="/dashboard/create-interview">
          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-200 border-0"
            size="lg"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create
          </Button>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 mb-2">
              Navigation
            </h3>
          </div>
          <SidebarMenu className="space-y-1">
            {SideBarOption.map((option, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton
                  asChild
                  className={`
                    relative p-3 rounded-xl transition-all duration-300 ease-in-out group
                    ${
                      path === option.path
                        ? "bg-white/10 text-white shadow-lg shadow-purple-500/10"
                        : "hover:bg-white/5 text-gray-400 hover:text-white"
                    }
                  `}
                >
                  <Link href={option.path} className="flex items-center w-full">
                    <div
                      className={`
                      mr-3 p-2 rounded-lg transition-all duration-300
                      ${
                        path === option.path
                          ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-md"
                          : "bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-white"
                      }
                    `}
                    >
                      <option.icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">{option.name}</span>
                    {path === option.path && (
                      <motion.div
                        layoutId="active-indicator"
                        className="absolute right-3 w-1.5 h-1.5 bg-pink-500 rounded-full box-shadow-glow"
                      />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-white/10">
        <div className="space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/5"
            size="sm"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/5"
            size="sm"
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            Help & Support
          </Button>

          <div className="pt-4 mt-4 border-t border-white/10">
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-[1px]">
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {user?.name?.[0] || "U"}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors truncate">
                  {user?.email || "user@example.com"}
                </p>
              </div>
              <LogOut
                className="w-4 h-4 text-gray-500 hover:text-red-400 cursor-pointer transition-colors"
                onClick={() => logout && logout()}
              />
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
