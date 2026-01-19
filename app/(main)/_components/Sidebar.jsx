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
import { Plus, Settings, User, HelpCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const path = usePathname();
  
  return (
    <Sidebar className="border-r border-gray-200 dark:border-gray-800">
      <SidebarHeader className="p-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <Image
              src={"/login.jpg"}
              alt="logo"
              width={200}
              height={100}
              className="w-[140px] h-auto rounded-lg shadow-sm"
            />
          </div>
        </div>
        <Button 
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ease-in-out"
          size="lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          Create New Interview
        </Button>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <SidebarGroup>
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-3 mb-2">
              Navigation
            </h3>
          </div>
          <SidebarMenu className="space-y-2">
            {SideBarOption.map((option, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton 
                  asChild 
                  className={`
                    relative p-3 rounded-xl transition-all duration-300 ease-in-out
                    hover:bg-gray-50 dark:hover:bg-gray-800
                    ${path === option.path 
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-l-4 border-blue-500 shadow-md' 
                      : 'hover:shadow-sm'
                    }
                  `}
                >
                  <Link href={option.path} className="flex items-center w-full">
                    <div className={`
                      mr-3 p-2 rounded-lg transition-all duration-300
                      ${path === option.path 
                        ? 'bg-blue-500 text-white shadow-lg' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-600'
                      }
                    `}>
                      <option.icon className="h-5 w-5" />
                    </div>
                    <span className={`
                      text-sm font-medium transition-all duration-300
                      ${path === option.path 
                        ? 'text-blue-700 dark:text-blue-300' 
                        : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100'
                      }
                    `}>
                      {option.name}
                    </span>
                    {path === option.path && (
                      <div className="absolute right-3 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t border-gray-100 dark:border-gray-800">
        <div className="space-y-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
            size="sm"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
            size="sm"
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            Help & Support
          </Button>
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  John Doe
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  john.doe@example.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}