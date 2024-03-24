import { useState } from 'react';
import { Link } from 'react-router-dom';
import robot from '../images/Robotics-cuate.svg'



function Register() {
    const [selcetedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState("");
    
    const [formData, setFormData] = useState({
        name:'',
        email: "",
        phone: "",
        password: "",
        photo:selcetedFile,
        role:"carowner"
    });
    const handleInputChange = e => {
        setFormData({...form, [e.target.name]: e.target.value})
    }

    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];
        console.log(file);
    }

    const submitHandler = (e) => {
        e.preventDefault()
    } 
    return (
        <section className="grid grid-cols-4 mx-20 my-10">
            <div className="lg:col-span-2 col-span-full">
                <img className="block h-full w-full object-cover" src={robot} alt="" />
            </div>
            <div className="lg:col-span-2 col-span-full">
                <div className="w-2/3 mx-auto  ">
                    <div className="">
                        <h3 className="font-heading text-2xl text-gray-900 font-semibold mb-2">Create to your account</h3>

                        <form onSubmit={submitHandler}>

                            <div className="mb-4 ">
                                <label className="block mb-1.5 text-sm text-gray-900 font-semibold" htmlFor="">Are You a:</label>
                                <select name="role" id="" value={formData.role}
                                onChange={handleInputChange} className="flex w-full">
                                    <option value="carOwner">carOwner</option>
                                    <option value="mechanic">mechanic</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1.5 text-sm text-gray-900 font-semibold" htmlFor="">Username</label>
                                <input 
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg" type="email" placeholder="username" />
                            </div>  
                            <div className="mb-4">
                                <label
                                className="block mb-1.5 text-sm text-gray-900 font-semibold" htmlFor="">Email</label>
                                <input
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg" type="email" placeholder="pat@saturn.dev" />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1.5 text-sm text-gray-900 font-semibold" htmlFor="">Password</label>
                                <input 
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg" type="email" placeholder="password" />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1.5 text-sm text-gray-900 font-semibold" htmlFor="">Phone Number</label>
                                <input 
                                value={formData.phone}
                                onChange={handleInputChange}
                                name='phone'
                                className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg" type="email" placeholder="phoneNumber" />
                            </div>
                           
                            <button className="relative group block w-full mb-4 py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-btnbg rounded-full overflow-hidden" type="submit">
                                <div className="absolute top-0 right-full w-full h-full bg-gray-900 transhtmlForm group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                                <span className="relative">Signup</span>
                            </button>
                            <span className="text-xs font-semibold text-gray-900">
                                <span>Don’t have an account?</span>
                                <Link className="inline-block ml-1 text-btnbg hover:text-orange-700" to={'/login'}>Login</Link>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
            
        </section>
    );
}

export default Register;