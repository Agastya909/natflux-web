"use client";
import Navbar from "@/component/Navbar";
import axios from "axios";
import Image from "next/image";
import { withRouter } from "next/router";
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
  const [videoData, setVideoData] = useState<VideoData[]>([]);
  const thumbnail_path = localStorage.getItem("videoThumbnail");
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const id = localStorage.getItem("videoId");
      const response = await axios.get(`http://localhost:4000/video/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      console.log(response.data);
      localStorage.removeItem("videoId");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center m-4">
      <Navbar />
      {thumbnail_path && (
        <Image
          src={thumbnail_path}
          height={360}
          width={640}
          alt={"video thumbnail"}
          style={{ height: 360, width: 640 }}
        />
      )}
    </div>
  );
}
