import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('ali@example.com');
    const [password, setPassword] = useState('Ali@123456');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post(
                BASE_URL+'/login', 
                {
                    email: email,
                    password: password
                },
                {withCredentials: true}
            );

            dispatch(addUser(res.data));
            navigate('/');

        }catch(err){
            setError(err?.response?.data || 'Something Went Wrong');
            console.log(err);
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
                                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Enter Password" className="input input-bordered w-full max-w-xs" />
                            </label>
                            <p className="text-red-500 pt-4">{error}</p>
                            <div className="card-actions justify-center mt-4">
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