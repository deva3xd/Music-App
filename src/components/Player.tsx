import Image from "next/image";
import { Pause, Play, SkipBack, SkipForward, Volume1Icon } from "lucide-react";
import Ph from "@/images/placeholder.png";

const Player = ({ selectSong, handleAudio, isPlaying }: any) => {
  if (!selectSong) return null;

  return (
    <>
      <div className="flex flex-row items-center gap-3">
        <Image src={Ph} alt="thumbnail" className="rounded-xs h-16 w-16" priority />
        <div className="flex flex-col">
          <span className="font-normal text-sm">{selectSong.title}</span>
          <span className="font-light text-sm">{selectSong.artist}</span>
        </div>
      </div>
      <div className="px-5 flex flex-col justify-center gap-2">
        <div className="flex flex-row justify-center gap-3">
          <SkipBack fill="true" className="p-1 rounded-full" size={30} />
          <button onClick={handleAudio} className="cursor-pointer">
            {isPlaying ? <Pause fill="true" className="bg-white p-1 rounded-full" size={30} /> : <Play fill="true" className="bg-white p-1 rounded-full" size={30} />}
          </button>
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
    </>
  )
}

export default Player;