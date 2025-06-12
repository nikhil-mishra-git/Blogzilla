import React, { useEffect, useState } from 'react'
import { Container, Loader } from '../components'
import { Outlet, NavLink } from 'react-router-dom'
import { ProfileDetail, ProfileLayout, MyBlogs } from '../components'

const Profile = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen"><Loader message='Loading Profile Page...' /></div>;

  return (
    <div className='py-8'>
      <Container>
        <ProfileLayout>
          <Outlet />
        </ProfileLayout>
      </Container>
    </div>
  )
}

export default Profile
