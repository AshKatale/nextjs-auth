"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

export default function ProfilePage() {

  const router = useRouter();
  const logout = async ()=>{
    try {
      await axios.get("/api/users/logout");
      console.log("Logout Successful")
      toast.success("Logout Successfully")
        router.push("/login")
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className='text-3xl'>Profile</h1>
        <button onClick={logout} className="p-2 mb-3 text-white border border-white rounded-lg mt-4">Logout</button>
    </div>
  )
}
