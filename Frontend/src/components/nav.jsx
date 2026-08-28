function Navbar() {
    return (
        <>
        <nav className="bg-gray-800 p-4 w-screen flex justify-between items-center">
            <h1 className="text-white text-2xl font-bold">Worldle!</h1>

            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                Login
            </button>
        </nav>
        </>
    )
}

export default Navbar