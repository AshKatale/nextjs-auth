"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import axios from "axios";
import  { useRouter } from "next/navigation";
import toast from "react-hot-toast";



export default function SignUpPage() {
  const  router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled,  setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);


  const onLogin = async () => {
    try {
      setLoading(true)
      const res = await axios.post("/api/users/login",user);
      console.log("Login Successful",res.data);
      toast.success("Login Successful")
      router.push("/profile")
    } catch (error: any) {
      console.log("Login Failed", error.message)
      toast.error(error.message)
    }
    finally{
      setLoading(false)
    }
  };

  useEffect(()=>{
    if(user.email.length>0  && user.password.length>0){
      setButtonDisabled(false)
    }
    else{
      setButtonDisabled(true)
    }

  },[user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr></hr>
      
      <label htmlFor="email">Email</label>
      <input
      className="p-2 mb-1 text-black rounded-lg"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => 
          setUser({...user,email :e.target.value})
        }
        placeholder="email"
      />
      <label htmlFor="password">Password</label>
      <input
      className="p-2 mb-1 text-black rounded-lg"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => 
          setUser({...user,password :e.target.value})
        }
        placeholder="password"
      />
      <button className="p-2 mb-3 text-white border border-white rounded-lg mt-4"
      onClick={onLogin}>
        {buttonDisabled ? "No Login" : "Login"}
      </button>
      <Link className="" href={"/signup"}>Sign Up</Link>
      {/* {user.username}
      {user.email}
      {user.password} */}
    </div>
  );
}
