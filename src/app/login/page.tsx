"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const page = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", user);
      console.log("login success", res.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("login failed");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center dark:bg-neutral-950 dark:text-white">
      <h1 className="text-4xl font-bold p-10">
        {loading ? "Processing" : "Login"}
      </h1>
      <hr className="bg-white w-[50%] text-3xl" />

      <div className="flex flex-col border-red-400 p-5">
        <label htmlFor="username">Email</label>
        <input
          className="text-black"
          id="email"
          value={user.email}
          type="text"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <label htmlFor="username">Password</label>
        <input
          className="text-black"
          id="password"
          value={user.password}
          type="text"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button
          onClick={onSignup}
          className="p-2 border border-gray-300 rounded-lg mb-4 mt-4 focus:outline-none focus:border-gray-600">
          {buttonDisabled ? "No login" : "Login"}
        </button>
        <Link href={"/signup"}>Visit Signup page </Link>
      </div>
    </main>
  );
};

export default page;
