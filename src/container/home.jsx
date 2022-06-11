import React, { useContext, useState, useEffect } from 'react';
import { fetchUserFromLocalStorage, getUserById } from '../Utils/APIs/userAPI';
import { UserContext } from '../context/userContext';
import UserProfile from '../components/userProfile';

import { SideBarContextProvider } from '../context/sideBarContext';
import Pins from './pins';
import Sidebar from '../components/sidebar';
import { SearchContextProvider } from '../context/searchContext';
import { PinContextProvider } from '../context/pinContext';
import { Routes, Route, useNavigate } from 'react-router-dom';
function Home() {
  const { user, setUser } = useContext(UserContext);
  const userInfo = fetchUserFromLocalStorage();
  useEffect(() => {
    getUserById(userInfo?._id).then((data) => {
      setUser(data[0]);
    });
    // if (!!!user) navigate('/login', { replace: true });
  }, [getUserById]);
  return (
    <div className="flex bg-gray-50 md:flex-row flex-col flex-1  h-screen transition-height duration-75 ease-in-out ">
      <SideBarContextProvider>
        <Sidebar />
      </SideBarContextProvider>
      <div className="mt-12 md:mt-0 w-full">
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins />} />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
