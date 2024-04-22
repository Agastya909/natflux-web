"use client";
import Navbar from "@/component/Navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const GENRE = [
  "Action",
  "Thriller",
  "Horror",
  "Drama",
  "Comedy",
  "Fantasy",
  "Animation",
  "Cartoon",
  "Romance",
  "Mystery",
  "Suspense",
];

export default function Home() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [release_year, setRelease_year] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [videoUploadStatus, setVideoUploadStatus] = useState<
    "success" | "failure" | "not-started" | "started"
  >("not-started");

  const setChipColor = (genreItem: string): string => {
    if (genre.length === 0) return "rgb(24, 24, 24)";
    const genreArray: string[] = JSON.parse(genre);
    if (genreArray.includes(genreItem)) return "rgb(67, 56, 202)";
    else return "rgb(24, 24, 24)";
  };

  const uploadAgainReset = () => {
    setVideoUploadStatus("not-started");
    setTitle("");
    setSummary("");
    setRelease_year("");
    setGenre("");
  };

  return (
    <div className="flex flex-col m-4">
      <Navbar />
      {videoUploadStatus === "started" ? (
        <label
          htmlFor="title"
          className="text-3xl font-bold text-center animate-bounce mt-10"
        >
          Uploading video
        </label>
      ) : null}
      {videoUploadStatus === "success" ? (
        <>
          <label
            htmlFor="title"
            className="text-3xl font-black text-center mt-10 text-green-600 tracking-wide"
          >
            Video Uploaded successfully
          </label>
          <label
            onClick={uploadAgainReset}
            htmlFor="title"
            className="text-lg font-semibold text-center mt-10 tracking-wide underline underline-offset-4 hover:cursor-pointer"
          >
            Upload another video
          </label>
        </>
      ) : null}
      {videoUploadStatus === "failure" ? (
        <>
          <label
            htmlFor="title"
            className="text-3xl font-bold text-center mt-10 text-red-600"
          >
            Video Upload Error
          </label>
          <label
            onClick={uploadAgainReset}
            htmlFor="title"
            className="text-lg font-semibold text-center mt-10 tracking-wide underline underline-offset-4 hover:cursor-pointer"
          >
            Try again
          </label>
        </>
      ) : null}
      {videoUploadStatus === "not-started" ? (
        <section
          className="max-w-[480px] flex flex-col self-center py-3 my-6 border rounded-lg p-4 shadow shadow-zinc-900"
          style={{ borderColor: "#232323" }}
        >
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 mt-4 mb-1"
          >
            Video Title
          </label>
          <input
            required
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            className="rounded-md px-3 py-1.5 my-1 text-white w-full"
            style={{ backgroundColor: "#181818" }}
          />
          <label
            htmlFor="summary"
            className="block text-sm font-medium leading-6 mt-2 mb-1"
          >
            Summary
          </label>
          <input
            required
            maxLength={1024}
            minLength={64}
            type="text"
            name="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            id="summary"
            className="rounded-md px-3 py-1.5 my-1 text-white w-full"
            style={{ backgroundColor: "#181818" }}
          />
          <label
            htmlFor="release_year"
            className="block text-sm font-medium leading-6 mt-2 mb-1"
          >
            Release year
          </label>
          <input
            required
            type="date"
            name="release_date"
            value={release_year}
            onChange={(e) => setRelease_year(e.target.value)}
            id="summary"
            className="rounded-md px-3 py-1.5 my-1 text-white w-full"
            style={{ backgroundColor: "#181818" }}
          />
          <label
            htmlFor="file"
            className="block text-sm font-medium leading-6 mt-2 mb-1"
          >
            File
          </label>
          <input
            required
            type="file"
            name="file"
            // value={""}
            // onChange={(e) => setPw(e.target.value)}
            id="summary"
            className="rounded-md px-3 py-1.5 my-1 w-full"
            style={{ backgroundColor: "#181818" }}
          />
          <label
            htmlFor="genre"
            className="block text-sm font-medium leading-6 mt-2 mb-1"
          >
            Genre
          </label>
          <div className="flex flex-row flex-wrap">
            {GENRE.map((genreItem, index) => {
              return (
                <div
                  key={index}
                  className="w-fit border-0 rounded-full mr-2 my-1 px-2 py-1 hover:bg-indigo-700 hover:border-indigo-700 bg-[#181818] hover:cursor-pointer hover:scale-105 transition-colors"
                  style={{ backgroundColor: setChipColor(genreItem) }}
                  onClick={() => {
                    if (genre.length === 0) {
                      return setGenre(JSON.stringify([genreItem]));
                    }
                    const genreArray = JSON.parse(genre);
                    const isSelected = genreArray.includes(genreItem);
                    if (!isSelected) {
                      const genreData = JSON.parse(genre);
                      setGenre(JSON.stringify([...genreData, genreItem]));
                    } else {
                      const genreData = JSON.parse(genre);
                      const updatedGenre = genreData.filter(
                        (item: string) => item !== genreItem
                      );
                      setGenre(JSON.stringify(updatedGenre));
                    }
                  }}
                >
                  {genreItem}
                </div>
              );
            })}
          </div>
          <button
            type="submit"
            onClick={async () => {
              try {
                setVideoUploadStatus("started");
                let user = localStorage.getItem("user");
                if (user && user?.length > 0) {
                  user = JSON.parse(user);
                  const formData = new FormData();
                  formData.append("title", title);
                  formData.append("summary", summary);
                  formData.append("genre", genre);
                  formData.append("release_date", release_year);
                  formData.append("uploader_id", user.id);
                  formData.append(
                    "file",
                    document.querySelector('input[type="file"]').files[0]
                  );

                  await axios.post(
                    "http://localhost:4000/video/add",
                    formData,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  );
                  setTimeout(() => {
                    setVideoUploadStatus("success");
                  }, 2000);
                }
              } catch (error) {
                setTimeout(() => {
                  setVideoUploadStatus("failure");
                }, 2000);
                console.log(error);
              }
            }}
            className="flex w-full mt-4 mb-1  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Upload Video
          </button>
        </section>
      ) : null}
    </div>
  );
}
