"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadButton } from "@/utils/uploadthing";

export default function Home() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Create FormData
    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);

    if (thumbnail) formData.append("thumbnail", thumbnail);
    if (audio) formData.append("audio", audio);

    await fetch("/api", {
      method: "POST",
      body: formData,  
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });

    setLoading(false);
    router.push("/");
  };

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
              className="bg-black w-full rounded-sm cursor-pointer px-3 py-2 hover:opacity-85"
              disabled={loading}
            >
              {loading ? "Saving..." : "Submit"}
            </button>
          </CardFooter>
        </form>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
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
