"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      console.log("Logout Successful");
      toast.success("Logout Successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }

   
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res);
    setData(res.data.data._id);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl">Profile</h1>
      <hr/>
      <h2>{data === "nothing" ? "Nothing": <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <button
        onClick={getUserDetails}
        className="p-2 mb-3 text-white border border-white rounded-lg mt-4"
      >
        Get User Details
      </button>
      <button
        onClick={logout}
        className="p-2 mb-3 text-white border border-white rounded-lg mt-4"
      >
        Logout
      </button>
    </div>
  );
}
