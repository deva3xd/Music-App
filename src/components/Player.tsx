import Image from "next/image";
import { Pause, Play, SkipBack, SkipForward, VolumeX, Volume, Volume1, Volume2 } from "lucide-react";
import { formatTime } from "@/utils/formatTime";
import Ph from "@/images/placeholder.png";
import { song } from "@/generated/prisma";

type headerProps = {
  selectSong: song | null;
  handleAudio: () => void;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  handleSeek: (value: number) => void;
  handleVolume: (value: number) => void;
  volume: number;
}

const Player = ({ selectSong, handleAudio, isPlaying, duration, currentTime, handleSeek, handleVolume, volume }: headerProps) => {
  if (!selectSong) return null;

  const volumeIcon = () => {
    if (volume === 0) return <VolumeX />;
    if (volume > 0 && volume <= 0.3) return <Volume />;
    if (volume > 0.3 && volume <= 0.7) return <Volume1 />;
    return <Volume2 />;
  };

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
          <span className="text-xs">{formatTime(currentTime)}</span>
          <input type="range" className="w-full accent-white" min={0} max={duration} value={currentTime} onChange={(e) => handleSeek(Number(e.target.value))} />
          <span className="text-xs">{formatTime(duration)}</span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-end px-5 gap-3">
        { volumeIcon() }
        <input type="range" className="w-1/3 accent-white" min={0} max={1} step={0.01} onChange={(e) => handleVolume(Number(e.target.value))} />
      </div>
    </>
  )
}

export default Player;