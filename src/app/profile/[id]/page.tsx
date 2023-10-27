import React from 'react'

function Profile({params}:any) {
  return (
   <div>Your id is {params.id}</div>
  )
}

export default Profile