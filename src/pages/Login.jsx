import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
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

    const handleSignUp = async () => {
        try {
            const res = await axios.post(
                BASE_URL + '/signup',
                {
                    firstName, lastName, email, password
                },
                {withCredentials: true}
            )

            dispatch(addUser(res?.data));
            navigate('/profile');

        } catch (err) {
            setError(err?.response?.data || 'Something Went Wrong');
            console.log(err.message);
        }
    }

    return(
        <>
            <div className="flex justify-center">
                <div className="card bg-base-300 w-96 shadow-xl my-4">
                    <div className="card-body">
                        <h2 className="card-title flex justify-center">{isLogin ? 'Login' : 'Sign Up'}</h2>
                            {!isLogin && (
                                <>
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">First Name</span>
                                        </div>
                                        <input onChange={(e) => setFirstName(e.target.value)} value={firstName} type="text" placeholder="Enter First Name" className="input input-bordered w-full max-w-xs" />
                                    </label>
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text">Last Name</span>
                                        </div>
                                        <input onChange={(e) => setLastName(e.target.value)} value={lastName} type="text" placeholder="Enter Last Name" className="input input-bordered w-full max-w-xs" />
                                    </label>
                                </>
                            )}
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
                                <div className="relative w-full">
                                    <input onChange={(e) => setPassword(e.target.value)} value={password} type={showPassword ? "text" : "password"} placeholder="Enter Password" className="input input-bordered w-full max-w-xs pr-10"/>
                                    <svg onClick={() => {setShowPassword(!showPassword)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                                        className="w-6 h-6 absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                                    >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                </div>
                                </label>
                            <p className="text-red-500 pt-4">{error}</p>
                            <div className="card-actions justify-center mt-2">
                                <button onClick={isLogin ? handleLogin : handleSignUp} className="btn btn-primary">{isLogin ? "Login" : "Sign up"}</button>
                            </div>
                            <p className="mt-4">{isLogin ? 'New to Dev Tinder?' : 'Already a member?'}<span className="ml-2 cursor-pointer hover:underline" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Sign up now" : "Login instead"}</span></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;