import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Profile() {
    const navigate = useNavigate();

    return (
        <>
        <div className='profile-container flex flex-col justify-center items-center'>
        <h1 className='text-3xl font-bold mb-4'>Profile Page</h1>
        <p className='mb-4'>Welcome to your profile page. Here you can view your personal stat's and Streaks for your account.</p>
        



        <button
          onClick={() => navigate("/settings")}
          className='hover:pointer-fine:hover:cursor-pointer hover:bg-blue-100 p-2'
        >
          Go to Settings
        </button>

        </div>
        
        </>
    );
}