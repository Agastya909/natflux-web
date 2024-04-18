"use client";
import Navbar from "@/component/Navbar";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [videoData, setVideoData] = useState<VideoData[]>([]);
  const [genre, setGenre] = useState<string[]>([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get("http://localhost:4000/video/home", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      const videos: VideoData[] = response.data.data;
      let genreSet = new Set<string>();
      videos.forEach((video) => {
        const genres: string[] = JSON.parse(video.genre);
        genres.forEach((genre) => genreSet.add(genre));
      });
      let genreArray = [...genreSet];
      genreArray.sort();
      setGenre(genreArray);
      setVideoData(videos);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center m-4">
      <Navbar />
      <div className="w-full px-4">
        {genre.map((genre, index) => {
          return (
            <div key={index}>
              <p className="font-bold tracking-wider text-2xl border-b-2 border-b-amber-500  w-fit">
                {genre}
              </p>
              <div className="flex my-4">
                {videoData
                  .filter((video) => video.genre.includes(genre))
                  .map((video, index) => (
                    <div
                      key={video.id}
                      className="w-64 mr-4 relative rounded-lg sm:w-50 sm:h-50 hover:cursor-pointer"
                      onClick={() => {
                        localStorage.setItem("videoId", video.id);
                        router.push("/video");
                      }}
                    >
                      <Image
                        src={video.thumbnail_path}
                        height={256}
                        width={256}
                        className="w-full h-36 rounded-lg lg:h-48"
                        alt={video.title}
                      />
                      <h2 className="bg-gradient-to-t from-[#00000085] text-lg font-bold tracking-wide pt-2 px-2 absolute bottom-0 w-full rounded-b-lg">
                        {video.title}
                      </h2>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
