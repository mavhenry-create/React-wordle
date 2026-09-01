import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col gap-3 min-h-screen items-center justify-center bg-blue-500'>
            <h1 className='text-3xl font-bold text-white'>Welcome to Clondle!</h1>
            <h2 className='text-xl text-white'>Ready for Today's word?</h2>
            <button onClick={() => navigate('/clondle')} className='bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200 transition duration-300'>Play Today! </button>
            <div className='flex flex-col gap-3 items-center justify-center mt-10 '>
                <h2 className='text-xl text-white font-bold'>New here?</h2>
                <h2 className='text-lg text-white'>Create an account to trackyour streak and statistics!</h2>
                <button onClick={() => navigate('/register')} className='bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200 transition duration-300'>Register</button>
                <h2 className='text-lg text-white'>Already have an account?</h2>
                <button onClick={() => navigate('/login')} className='bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200 transition duration-300'>Login</button>
            </div>
        </div>
    );
}