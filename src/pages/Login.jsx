import { useState } from 'react';
import { Link } from 'react-router-dom';
import robot from '../images/Robotics-cuate.svg'
function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const handleInputChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
        console.log(e.target.value);
    }


    const submitHandler = (e) => {
        e.preventDefault()  
        console.log(formData);
    } 

    return (
        <>
             <section className="grid grid-cols-4 mx-20 my-10">
            <div className="lg:col-span-2 col-span-full">
                <img className="block h-full w-full object-cover" src={robot} alt="" />
            </div>
            <div className="lg:col-span-2 col-span-full">
                <div className="w-2/3 mx-auto  ">
                    <div className="">
                        <h3 className="font-heading text-2xl text-gray-900 font-semibold mb-2">Sign In to your account</h3>

                        <form onSubmit={submitHandler}>
                            <div className="mb-4">
                                <label
                                className="block mb-1.5 text-sm text-gray-900 font-semibold" htmlFor="">Email</label>
                                <input
                                value={formData.email}
                                onChange={handleInputChange}
                                name="email"
                                className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg" type="email" placeholder="pat@saturn.dev" />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1.5 text-sm text-gray-900 font-semibold" htmlFor="">Password</label>
                                <input 
                                value={formData.password}
                                onChange={handleInputChange}
                                name="password"
                                className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg" type="text" placeholder="password" />
                            </div>
                           
                            <button className="relative group block w-full mb-4 py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-btnbg rounded-full overflow-hidden" type="submit">
                                <div className="absolute top-0 right-full w-full h-full bg-gray-900 transhtmlForm group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                                <span className="relative">Login</span>
                            </button>
                            <span className="text-xs font-semibold text-gray-900">
                                <span>Don’t have an account?</span>
                                <Link className="inline-block ml-1 text-btnbg hover:text-orange-700" to={'/register'}>Register</Link>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
            
        </section>
        </>
    );
}

export default Login;

