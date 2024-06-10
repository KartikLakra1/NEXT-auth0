"use client";

import React from "react";

export default function page({ params }: any) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center dark:bg-neutral-950 dark:text-white">
      <h1 className="text-4xl font-bold p-10">Profile Page</h1>
      <hr className="bg-white w-[50%] text-3xl" />

      <h2 className="mt-6 p-3 bg-green-800 rounded text-white">{params.id}</h2>
    </div>
  );
}
