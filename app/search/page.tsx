"use client";
import Navbar from "@/component/Navbar";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Router from "next/router";
import { useEffect, useState } from "react";

type VideoData = {
  id: string;
  title: string;
  summary: string;
  uploader_id: string;
  genre: string;
  path: string;
  thumbnail_path: string;
  length: number;
  size: number;
  release_date: string;
  created_at: Date;
  updated_at: Date;
};

export default function Login() {
  // const router = useRouter();
  const [videoData, setVideoData] = useState<VideoData[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<
    "notStarted" | "loading" | "finished" | "error"
  >("notStarted");
  // useEffect(() => {
  // fetchVideos();
  // }, []);

  const fetchVideos = async () => {
    try {
      setLoading("loading");
      const resp = await axios.post(
        "http://localhost:4000/video/search",
        { genre: search, searchTerm: search },
        { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } }
      );
      setVideoData(resp.data.data);
      setLoading("finished");
    } catch (error) {
      console.log(error);
      setLoading("error");
    }
  };

  return (
    <div className="flex flex-col m-4">
      <Navbar />
      <div className="flex flex-col m-4">
        <form
          className="flex justify-center"
          onSubmit={(e) => {
            e.preventDefault();
            fetchVideos();
          }}
        >
          <input
            type="text"
            name="email"
            placeholder="Search by title or genre"
            id="email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-md p-3 my-1 text-white w-1/2 self-center"
            style={{ backgroundColor: "#181818" }}
          />
        </form>
      </div>
      {loading === "loading" ? (
        <p className="text-center text-2xl tracking-wide font-semibold animate-pulse">
          Searching for Videos
        </p>
      ) : null}
      {videoData.length > 0 && loading == "finished" ? (
        <div>
          <div className="flex my-4">
            {videoData.map((video, index) => (
              <Link
                href={{
                  pathname: "/video",
                  query: {
                    id: video.id,
                  },
                }}
                key={video.id}
                className="w-64 mr-4 relative rounded-lg sm:w-50 sm:h-50 hover:cursor-pointer hover:scale-105 hover:shadow-zinc-800 hover:shadow-lg  transition"
              >
                <Image
                  src={video.thumbnail_path}
                  height={180}
                  width={384}
                  className="w-96 h-40 rounded-lg"
                  alt={video.title}
                />
                <h2 className="bg-gradient-to-t from-[#00000085] text-lg font-bold tracking-wide pt-2 px-2 absolute bottom-0 w-full rounded-b-lg">
                  {video.title}
                </h2>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
