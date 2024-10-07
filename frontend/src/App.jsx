import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './pages/Auth/Navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex flex-col">
        <Navigation />

        <main className="flex-grow bg-gradient-to-br from-gray-800 via-gray-900 to-black flex justify-center items-center">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default App;