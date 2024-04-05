import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mechanic from '../images/signup.jpeg'
import { clearMessage } from "../store/features/auth/authSlice.js";
import { register } from "../store/features/auth/authAction.js";
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import  {HashLoader}  from 'react-spinners';
import Input from '../components/fields/Input';
import LabelField from '../components/fields/LabelField';
import Div from '../components/fields/Div';
import ButtonAuth from '../components/fields/ButtonAuth';



function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "user"
    });
    const { loading, message, isRegisterSuccess } = useSelector((state) => state.auth);

    const handleInputChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }    
    useEffect(() => {
        if (message !== "") {
            toast(message, {
                duration: 2000
            })
            dispatch(clearMessage());
            if (isRegisterSuccess) {
                navigate('/login')
            }
        }
    }, [message, isRegisterSuccess]);

    const submitHandler = async (e) => {
        e.preventDefault()
        dispatch(register(formData))
    }
    return (
        <section className="grid grid-cols-4 gap-10 mx-20 my-20">
            <div className="lg:col-span-2 col-span-full">
                <img className="block h-full w-full object-cover rounded-3xl" src={mechanic} alt="" />
            </div>
            <div className="lg:col-span-2 col-span-full">
                <div className="h-full w-4/5">
                    <div className="">
                        <h3 className="font-heading text-2xl text-gray-900 font-semibold mb-2">
                            Create your account
                        </h3>
                        <form onSubmit={submitHandler}>
                            <Div >
                                <LabelField title="Are You a:"/>
                                <select name="role" id="" value={formData.role}
                                    onChange={handleInputChange} className="flex w-full">
                                    <option value="user">user</option>
                                    <option value="mechanic">mechanic</option>
                                </select>
                            </Div>
                            <Div >
                                <LabelField title={"Username"}/>
                                <Input
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    name="username"
                                    type="text" placeholder="username" />
                            </Div>
                            <Div >
                                <LabelField title={"Email"}/>
                                <Input
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    name="email"
                                    type="email" placeholder="pat@saturn.dev" />
                            </Div>
                            <Div >
                                <LabelField title={"Password"}/>
                                <Input
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    name="password"
                                    type="password" placeholder="password" />
                            </Div>
                            
                            <ButtonAuth disabled={loading}>
                            <span className="relative">{loading ? <HashLoader size={23} color="#fff" /> : "Signup"}</span>
                            </ButtonAuth>
                        </form>
                        <span className="text-base font-semibold text-gray-900">
                            <span>Already have an account?</span>
                            <Link className="inline-block ml-1 text-btnbg hover:text-gray-900"
                            to={'/login'}>Login</Link>
                        </span>

                    </div>
                </div>
            </div>

        </section>
    );
}

export default Register;