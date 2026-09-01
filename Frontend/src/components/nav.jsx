import { useNavigate } from 'react-router-dom';
function Navbar() {
    const navigate = useNavigate();
    return (
        <>
        <nav className="bg-gray-800 p-4 w-screen flex justify-between items-center">
            <button onClick={() => navigate('/clondle')} className="text-white text-2xl font-bold">Clondle!</button>

            <button onClick={() => navigate('/login')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                Login
            </button>
        </nav>
        </>
    )
}

export default Navbar