import { useState } from "react";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post(
                'http://localhost:7777/login', 
                {
                    email: email,
                    password: password
                },
                {withCredentials: true}
            );

            console.log(res);

        }catch(err){
            console.log(err.message);
        }
    }

    return(
        <>
            <div className="flex justify-center">
                <div className="card bg-base-300 w-96 shadow-xl my-4">
                    <div className="card-body">
                        <h2 className="card-title text-center">Login</h2>
                        <form onSubmit={handleLogin}>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Email</span>
                                </div>
                                <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Enter Email" className="input input-bordered w-full max-w-xs" />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Password</span>
                                </div>
                                <input onChange={(e) => setPassword(e.target.value)} value={password} type="text" placeholder="Enter Password" className="input input-bordered w-full max-w-xs" />
                            </label>
                            <div className="card-actions justify-end mt-4">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;