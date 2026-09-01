import { useState, useEffect } from "react";


export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <div className='flex flex-col items-center justify-center max-h-screen mt-20'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-4 border-2 border-black p-4 rounded-lg'>
                
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='border-2 border-black rounded-md p-2 text-center'
                />
                
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='border-2 border-black rounded-md p-2 text-center'
                />
                
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border-2 border-black rounded-md p-2 text-center'
                />
                <button type="submit" className='border-2 border-black text-white bg-blue-600 hover:bg-blue-400 hover:text-white rounded-md p-2 text-center'>Register</button>
                <div>
                    <span className='text-blue-500 cursor-pointer'>Already have an account? Login</span>
                </div>
            </form>
              
            
        </div>
    );
}