"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

const Song = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!audio) return;

    // upload file to uploadthing
    const uploaded = await startUpload([audio]);
    const audioUrl = uploaded?.[0]?.ufsUrl;

    if (!audioUrl) return;

    await fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        artist,
        audio: audioUrl,
      }),
    });
    setLoading(false);
    router.push("/");
  };

  const { startUpload } = useUploadThing("fileUploader", {
    onClientUploadComplete: (res) => {
      console.log("Files:", res);
    },
    onUploadError: (error) => {
      console.log("Error: ", error);
    },
  });

  return (
    <div className="flex flex-row justify-center items-center h-screen">
      <Card className="bg-foreground border-none text-white rounded-sm px-4 w-md">
        <CardHeader>
          <CardTitle className="text-center text-3xl uppercase">
            Add Song
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="mb-4">
            <label htmlFor="title">
              <span>Title</span>
              <input
                type="text"
                className="bg-foreground w-full text-white border border-white px-3 py-2 rounded-sm"
                id="title"
                name="title"
                placeholder="title"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
                required
              />
            </label>
          </CardContent>
          <CardContent className="mb-4">
            <label htmlFor="title">
              <span>Artist</span>
              <input
                type="text"
                className="bg-foreground w-full text-white border border-white px-3 py-2 rounded-sm"
                id="artist"
                name="artist"
                placeholder="artist"
                value={artist}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setArtist(e.target.value)
                }
                required
              />
            </label>
          </CardContent>
          <CardContent className="mb-4">
            <label htmlFor="thumbnail">
              <span>Thumbnail</span>
              <input
                type="file"
                className="bg-foreground w-full text-white border border-white px-3 py-2 rounded-sm"
                id="thumbnail"
                name="thumbnail"
                accept=".jpg,.jpeg"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files?.[0]) {
                    setThumbnail(e.target.files[0]);
                  }
                }}
              />
            </label>
          </CardContent>
          <CardContent className="mb-4">
            <label htmlFor="song">
              <span>Song</span>
              <input
                type="file"
                className="bg-foreground w-full text-white border border-white px-3 py-2 rounded-sm"
                id="song"
                name="song"
                accept=".mp3,audio/mpeg"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files?.[0]) {
                    setAudio(e.target.files[0]);
                  }
                }}
                required
              />
            </label>
          </CardContent>
          <CardFooter>
            <button
              type="submit"
              className="bg-black w-full rounded-sm cursor-pointer px-3 py-2 hover:opacity-85 disabled:cursor-default disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Saving..." : "Submit"}
            </button>
          </CardFooter>
        </form>
        <div className="flex justify-between items-center px-6">
          <span className="text-green-500 -rotate-6">BEATWAVE</span>
          <div className="flex flex-row items-center">
            <ArrowLeft size={20} />
            <Link href="/" className="hover:underline">
              Back
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Song;