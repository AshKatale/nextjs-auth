"use client";

import React from 'react'

export default function UserProfile({params}: { params: { id: string } }) {

  const logout = ()=>{

  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className='text-3xl'>Profile : {params.id}</h1>
        <button onClick={logout} className="p-2 mb-3 text-white border border-white rounded-lg mt-4">Logout</button>
    </div>
  )
}
