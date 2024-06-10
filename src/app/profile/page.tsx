"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserData = async () => {
    try {
      const res = await axios.post("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center dark:bg-neutral-950 dark:text-white">
      <h1 className="text-4xl font-bold p-10">Profile Details</h1>
      <hr className="bg-white w-[50%] text-3xl" />
      <h2 className="p-4">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr className="bg-white w-[50%] text-3xl" />

      <button
        className="p-2 border bg-green-600 text-white border-gray-300 rounded-lg mb-4 mt-4 focus:outline-none focus:border-gray-600"
        onClick={getUserData}>
        get user details
      </button>

      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 mt-4 focus:outline-none focus:border-gray-600 bg-blue-600 text-white"
        onClick={logout}>
        logout
      </button>
    </div>
  );
}
