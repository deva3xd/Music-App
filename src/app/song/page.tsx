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

export default function Home() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log('test')
  }

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
                required
              />
            </label>
          </CardContent>
          <CardFooter>
            <button
              type="submit"
              className="bg-black w-full rounded-sm cursor-pointer px-3 py-2"
              disabled={loading}
            >
              {loading ? "Saving..." : "Submit"}
            </button>
          </CardFooter>
        </form>
        <div className="flex justify-end items-center">
          <ArrowLeft size={20} />
          <Link
            href="/"
            className="hover:underline pe-6"
          >
            Back
          </Link>
        </div>
      </Card>
    </div>
  );
}
