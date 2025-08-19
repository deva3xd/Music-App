import React from "react";
import Photo1 from "@/images/wall.jpg";
import Image from "next/image";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Pause, Play, SkipBack, SkipForward, Volume1Icon } from "lucide-react";
import Ptv from "@/images/ptv.png";
import A7x from "@/images/a7x.png";
import Lp from "@/images/lp.png";
import Vt from "@/images/vt.png";
import Fs from "@/images/fs.png";
import Miw from "@/images/miw.png";

const page = () => {
  return (
    <div className="flex flex-row justify-center gap-10 h-screen">
      <div className="w-1/6">
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      </div>
      <div className="w-5/6 flex flex-col h-full items-center bg-foreground max-w-screen-xl">
        <div className="text-white m-2 w-full h-5/6 p-6">
          <div className="grid grid-cols-6">
            <div className="flex flex-col items-center mb-2">
              <div>
                <Image
                  src={Ptv}
                  alt="thumbnail"
                  className="rounded-xs h-28 w-28"
                />
                <div className="flex flex-row justify-between items-center">
                  <span className="font-normal text-sm">Hell Above</span>
                  <button className="bg-green-500 rounded-full p-1">
                    <Play size={12} fill="true" className="text-black" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center mb-2">
              <div>
                <Image
                  src={Miw}
                  alt="thumbnail"
                  className="rounded-xs h-28 w-28"
                />
                <div className="flex flex-row justify-between items-center">
                  <span className="font-normal text-sm">Voices</span>
                  <button className="bg-green-500 rounded-full p-1">
                    <Play size={12} fill="true" className="text-black" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center mb-2">
              <div>
                <Image
                  src={A7x}
                  alt="thumbnail"
                  className="rounded-xs h-28 w-28"
                />
                <div className="flex flex-row justify-between items-center">
                  <span className="font-normal text-sm">Almost Easy</span>
                  <button className="bg-green-500 rounded-full p-1">
                    <Play size={12} fill="true" className="text-black" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center mb-2">
              <div>
                <Image
                  src={Vt}
                  alt="thumbnail"
                  className="rounded-xs h-28 w-28"
                />
                <div className="flex flex-row justify-between items-center">
                  <span className="font-normal text-sm">Empty World</span>
                  <button className="bg-green-500 rounded-full p-1">
                    <Play size={12} fill="true" className="text-black" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center mb-2">
              <div>
                <Image
                  src={Fs}
                  alt="thumbnail"
                  className="rounded-xs h-28 w-28"
                />
                <div className="flex flex-row justify-between items-center">
                  <span className="font-normal text-sm">Scars</span>
                  <button className="bg-green-500 rounded-full p-1">
                    <Play size={12} fill="true" className="text-black" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center mb-2">
              <div>
                <Image
                  src={Vt}
                  alt="thumbnail"
                  className="rounded-xs h-28 w-28"
                />
                <div className="flex flex-row justify-between items-center">
                  <span className="font-normal text-sm">Harley</span>
                  <button className="bg-green-500 rounded-full p-1">
                    <Play size={12} fill="true" className="text-black" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center mb-2">
              <div>
                <Image
                  src={A7x}
                  alt="thumbnail"
                  className="rounded-xs h-28 w-28"
                />
                <div className="flex flex-row justify-between items-center">
                  <span className="font-normal text-sm">Danger Line</span>
                  <button className="bg-green-500 rounded-full p-1">
                    <Play size={12} fill="true" className="text-black" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center mb-2">
              <div>
                <Image
                  src={Lp}
                  alt="thumbnail"
                  className="rounded-xs h-28 w-28"
                />
                <div className="flex flex-row justify-between items-center">
                  <span className="font-normal text-sm">NUMB</span>
                  <button className="bg-green-500 rounded-full p-1">
                    <Pause size={12} fill="true" className="text-black" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-white mt-2 bg-background w-full h-1/6 grid grid-cols-3">
          <div className="flex flex-row items-center gap-3">
            <Image
              src={Lp}
              alt="thumbnail"
              className="rounded-xs h-16 w-16"
            />
            <span>Numb</span>
          </div>
          <div className="px-5 flex flex-col justify-center gap-2">
            <div className="flex flex-row justify-center gap-3">
              <SkipBack fill="true" className="p-1 rounded-full" size={30} />
              <Pause
                fill="true"
                className="bg-white p-1 rounded-full"
                size={30}
              />
              <SkipForward fill="true" className="p-1 rounded-full" size={30} />
            </div>
            <div className="flex flex-row items-center gap-3">
              <span className="text-xs">1.00</span>
              <input type="range" className="w-full accent-white" />
              <span className="text-xs">3.07</span>
            </div>
          </div>
          <div className="flex flex-row items-center justify-end px-5 gap-3">
            <Volume1Icon />
            <input type="range" className="w-1/3 accent-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
