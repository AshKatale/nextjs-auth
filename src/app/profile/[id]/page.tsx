import React from 'react'

export default function UserProfile({params}:any) {
  return (
    <div>
        <h1>{params.id}</h1>
    </div>
  )
}
