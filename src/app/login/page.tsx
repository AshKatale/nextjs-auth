"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import axios from "axios";
import  { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";



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
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.log("Login Failed", errorMessage);
      toast.error("Invalid Credentials");
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
      <div><Toaster/></div>
      
      {loading ? <Loader/> : 
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>
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
      <Link href='/forgotpassword'>
      <button className="p-2 mb-3 text-white border border-white rounded-lg mt-4">
        Forgot Password ?
      </button>
      </Link>
      </div>
}
      {/* {user.username}
      {user.email}
      {user.password} */}
    </div>
  );
}
