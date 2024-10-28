"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const [isVerified , setIsVerified] = useState();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      console.log("Logout Successful");
      toast.success("Logout Successfully");
      router.push("/login");
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.log(errorMessage);
      toast.error(errorMessage);
    }

   
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res);
    setData(res.data.data._id);
    setIsVerified(res.data.data.isVerified)
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div><Toaster/></div>
      <h1 className="text-3xl">Profile</h1>
      <hr/>
      <h2>{data === "nothing" ? "": <Link href={`/profile/${data}`}>JWT Token : {data}</Link>}</h2>
      <h3>Verified :{isVerified ? "Yes" : "No"}</h3>
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
