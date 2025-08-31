import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import Link from "next/link";
import Photo1 from "@/images/1.jpg";
import Photo2 from "@/images/2.jpg";
import Photo3 from "@/images/3.jpg";
import Image from "next/image";

export function AppSidebar() {
  return (
    <Sidebar className="border-none">
      <SidebarContent className="bg-foreground text-white px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white px-0 font-semibold text-md border-b-2 border-white rounded-none text-2xl flex flex-row justify-center uppercase">
            Your Library
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-6">
              <SidebarMenuItem className="my-2">
                <span className="text-sm font-semibold text-gray-200">
                  Playlists
                </span>
              </SidebarMenuItem>
              <SidebarMenuItem className="mb-2">
                <div className="flex flex-row">
                  <Image src={Photo1} alt="thumbnail" className="h-12 w-12 rounded-xs" />
                  <div className="flex flex-col justify-center ms-2">
                    <span className="font-semibold text-base">Mood</span>
                    <span className="font-normal text-xs text-gray-200">Created in 2025</span>
                  </div>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem className="mb-2">
                <div className="flex flex-row">
                  <Image src={Photo2} alt="thumbnail" className="h-12 w-12 rounded-xs" />
                  <div className="flex flex-col justify-center ms-2">
                    <span className="font-semibold text-base">Chill</span>
                    <span className="font-normal text-xs text-gray-200">Created in 2025</span>
                  </div>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem className="mb-2">
                <div className="flex flex-row">
                  <Image src={Photo3} alt="thumbnail" className="h-12 w-12 rounded-xs" />
                  <div className="flex flex-col justify-center ms-2">
                    <span className="font-semibold text-base text-green-500">Mix</span>
                    <span className="font-normal text-xs text-gray-200">Created in 2025</span>
                  </div>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-foreground text-white p-4">
        <Link
          href="/song"
          className="hover:opacity-85 flex flex-row items-center"
        >
          <Plus size={20} />
          Add Song
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
