"use client";
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

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get("http://localhost:4000/video/home", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      const videos: VideoData[] = response.data.data;
      setVideoData(videos);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center m-4">
      <p>Home screen</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {videoData.map((video, index) => {
          return (
            <div
              key={index}
              className="border rounded-lg w-full pb-4 sm:w-50 sm:h-50"
            >
              <Image
                src={video.thumbnail_path}
                height={256}
                width={256}
                className="w-full h-36 rounded-t-lg lg:h-48"
                alt={video.title}
              />
              <h2 className="text-lg font-semibold px-2">{video.title}</h2>
              <p className="text-sm font-thin text-gray-300 px-2">
                {video.summary}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
