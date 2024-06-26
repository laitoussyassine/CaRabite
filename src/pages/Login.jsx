import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import robot from '../images/Robotics-cuate.svg'
import { clearMessage } from "../store/features/auth/authSlice.js";
import { login } from "../store/features/auth/authAction.js";
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { HashLoader } from 'react-spinners';
import Input from '../components/fields/Input';
import Div from '../components/fields/Div';
import ButtonAuth from '../components/fields/ButtonAuth';
import LabelField from '../components/fields/LabelField';
import famillyServices from '../images/login_register/famillyServices.jpg'
function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const handleInputChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        console.log(e.target.value);
    }
    const { loading, message, isLoginSuccess,error, role } = useSelector((state) => state.auth);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(formData));
    }
    useEffect(() => {
        if (message !== "") {
            if(error) {
                toast.error(message, {
                    duration: 2000
                })
                dispatch(clearMessage());
            } else {
                if(!error) {
                    toast(message, {
                        duration: 2000
                    })
                    dispatch(clearMessage());
                }
            }
            if (isLoginSuccess) {
                if(role === "mechanic")
                navigate('/mechanic/profile/me');
                else {
                    navigate('/user/profile/me');
                }
            }
        }
    }, [isLoginSuccess, message])
    return (
        <>
            <section className="grid grid-cols-4 mx-auto w-4/5 h-[800px] items-center">
                <div className="lg:col-span-2 col-span-full">
                    <img className="block h-full w-full object-contain rounded-xl" src={famillyServices} alt="" />
                </div>
                <div className="lg:col-span-2 col-span-full">
                    <div className="w-2/3 mx-auto">
                        <div className="">
                            <h3 className="font-heading text-2xl text-gray-900 font-semibold mb-2">Sign In to your account</h3>
                            <form onSubmit={submitHandler}>
                                <Div>
                                    <LabelField title={"Email"}/>
                                    <Input
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        name="email"
                                        type="email" placeholder="pat@saturn.dev" />
                                </Div>
                                <Div>
                                    <LabelField title={"Password"}/>
                                    <Input
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        name="password"
                                        type="password" placeholder="password" />
                                </Div>
                                <ButtonAuth disabled={loading}>
                                    <span className="relative">{loading ? <HashLoader size={23} color="#fff" /> : "Login"}</span>
                                </ButtonAuth>
                            </form>
                            <span className="text-base font-semibold text-gray-900">
                                <span>Don’t have an account?</span>
                                <Link className="inline-block ml-1 text-btnbg hover:text-gray-900" to={'/register'}>Register</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Login;