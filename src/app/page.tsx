"use client";
import { useState } from 'react';
import Auth from '../components/Auth';
import ChatRoom from '../components/ChatRoom';

const Home = () => {
  const [user, setUser] = useState(null);

  return (
    <div>
      {user ? <ChatRoom user={user} /> : <Auth setUser={setUser} />}
    </div>
  );
};

export default Home;
