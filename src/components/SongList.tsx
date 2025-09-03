import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { Pause, Play } from "lucide-react";
import { song } from "@/generated/prisma";
import Ph from "@/images/placeholder.png";

type headerProps = {
  songs: song[];
  isPlaying: boolean;
  songState: {
    value: song | null;
    set: Dispatch<SetStateAction<song | null>>;
  },
  handleClick: (song: song) => void;
}

const SongList = ({ songs, songState, isPlaying, handleClick }: headerProps) => {
  return (
    <div className="grid grid-cols-6">
      {songs.map((song) => {
        return (
          <div key={song.id} className="flex flex-col items-center mb-2">
            <div className=" h-36 w-36">
              <Image
                src={Ph}
                alt="thumbnail"
                className="rounded-t-xs"
                priority
              />
              <div className="flex flex-row justify-between items-end">
                <div className="flex flex-col">
                  <span className="font-normal text-sm line-clamp-1" title={song.title}>{song.title}</span>
                  <span className="font-light text-xs line-clamp-1">{song.artist}</span>
                </div>
                <button onClick={() => handleClick(song)} className="bg-green-500 rounded-full p-1 cursor-pointer text-black">
                  {songState.value?.id === song.id && isPlaying ? (
                    <Pause size={14} fill="true" />
                  ) : (
                    <Play size={14} fill="true" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SongList;