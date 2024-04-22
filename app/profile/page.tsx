"use client";
import Navbar from "@/component/Navbar";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useReducer, useState } from "react";

type User = {
  name: string;
  pfp_path: string;
  id: string;
  email: string;
};

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    email: "",
    id: "",
    name: "",
    pfp_path: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [pfpUploadStatus, setPfpUploadStatus] = useState<
    "not-started" | "success" | "failure"
  >("not-started");
  useEffect(() => {
    const userData: string | null = localStorage.getItem("user");
    if (userData && userData.length) {
      const user: User = JSON.parse(userData);
      setUser(user);
    }
  }, []);
  return (
    <div className="m-4 ">
      <Navbar />
      <div className="flex flex-col items-center justify-center max-w-lg mx-auto">
        <div className="flex flex-col items-center">
          <div className="my-10 flex flex-col items-center">
            <div className="relative">
              <div className="absolute right-0 top-0">
                <label htmlFor="fileInput">
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      if (event.target.files && event.target.files[0]) {
                        console.log(event.target.files[0]);
                        setSelectedImage(event.target.files[0]);
                      }
                    }}
                    style={{ display: "none" }}
                  />
                  <Image
                    src="/edit.png"
                    height={35}
                    width={35}
                    alt={user.name}
                    style={{
                      height: 35,
                      width: 35,
                      borderRadius: 35,
                      cursor: "pointer",
                    }}
                  />
                </label>
              </div>
              <Image
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : user.pfp_path
                }
                height={144}
                width={144}
                alt={user.name}
                style={{ height: 144, width: 144, borderRadius: 144 }}
              />
            </div>
            <p className="text-center text-2xl tracking-wide font-semibold mt-4">
              {user.name}
            </p>
            <p className="mt-2 text-zinc-300">{user.email}</p>
            {selectedImage ? (
              <div className="flex flex-col w-full mt-8">
                <button
                  type="submit"
                  onClick={async () => {
                    try {
                      const formData = new FormData();
                      formData.append("pfp", selectedImage);
                      formData.append("id", user.id);
                      const response = await axios.post(
                        "http://localhost:4000/user/update/profile-picture",
                        formData,
                        {
                          headers: {
                            "Content-Type": "multipart/form-data",
                          },
                        }
                      );
                      let userData = user;
                      userData.pfp_path = response.data.data.pfp_path;
                      localStorage.setItem("user", JSON.stringify(userData));
                      setPfpUploadStatus("success");
                      setSelectedImage(null);
                      setTimeout(() => {
                        setPfpUploadStatus("not-started");
                      }, 2000);
                    } catch (error) {
                      setPfpUploadStatus("failure");
                      setSelectedImage(null);
                      setTimeout(() => {
                        setPfpUploadStatus("not-started");
                      }, 2000);
                    }
                  }}
                  className="flex w-full my-1  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Update Profile Picture
                </button>
                <button
                  type="submit"
                  onClick={() => setSelectedImage(null)}
                  className="flex w-full my-1  justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Cancel
                </button>
              </div>
            ) : null}
            {pfpUploadStatus === "success" ? (
              <label
                htmlFor="title"
                className="text-xl font-black text-center mt-10 text-green-600 tracking-wide"
              >
                Profile picture updated
              </label>
            ) : null}
            {pfpUploadStatus === "failure" ? (
              <label
                htmlFor="title"
                className="text-xl font-black text-center mt-10 text-red-600 tracking-wide"
              >
                Could not update profile picture
              </label>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
