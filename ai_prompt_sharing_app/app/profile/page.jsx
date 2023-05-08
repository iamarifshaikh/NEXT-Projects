"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';
const MyProfile = () => {
    const { data: session } = useSession();
    
    const [posts, setPosts] = useState([]);

    useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
      console.log('data:', data);
    }
    
    if(session?.user.id) fetchPosts();
  },[session?.user.id]);

    const handleEdit = async() => {
        
    }

    const handleDelete = async () => {
        
    }

  return (
      <Profile
          name="My"
          desc="Welcome to your personalized page"
          data={posts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
      />
  )
}

export default MyProfile;