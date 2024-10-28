"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"
import toast from "react-hot-toast";

export default function page() {

    const [email, setEmail] = useState("");
    const router = useRouter();

    const sendResetPasswordMail = async () => {
      try {
          const res = await axios.post('/api/users/forgotpassword', { email });
          console.log(res);
          router.push('/login')
          toast.success("Check mail for Password reset link",{duration : 6000})
      } catch (error) {
          console.log(error);
          toast.error("Something went wrong")
      }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <label htmlFor="email">Enter email to reset password</label>
        <input
    className="p-2 mb-1 text-black rounded-lg"
      type="text"
      id="email"
      placeholder="email"
      onChange={(e)=>setEmail(e.target.value)}
    />
    {/* <p>{email}</p> */}
    <button className="p-2 mb-3 text-white border border-white rounded-lg mt-4" onClick={sendResetPasswordMail}>
        Send Mail
    </button></div>
  )
}
