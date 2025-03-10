import React from 'react'
import logo from "/src/assets/images/logo.png"
import logoInstagram from "/src/assets/images/instagram.svg";
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <>
            {/* footer */}
            <div className="w-screen bg-black px-12 justify-between flex flex-col py-4">

                <div className="grid grid-cols-3 gap-8 mt-8">
                    {/* logo + company description */}
                    <div className="flex flex-col gap-4 col-span-1">
                        <img src={logo} width={175} alt="" />
                        <p className='text-white w-[80%]'>
                            At Hero Car Rental, we pride ourselves on providing top-quality vehicles and exceptional customer service. With a wide range of options to choose from, we are sure to have the perfect car to suit your needs. Whether you're in town for business or pleasure, our team is dedicated to ensuring a smooth and hassle-free rental experience. Trust us to get you on the road and exploring Dubai in style.
                        </p>
                    </div>

                    {/* navigation */}
                    <div className="flex flex-col gap-4 col-span-1 px-8 py-10">
                        <ul className='text-white text-lg space-y-2'>
                        <li><Link className='hover:text-red-600' to="/">Home</Link></li>
                        <li><Link className='hover:text-red-600' to="/about">About Us</Link></li>
                        <li><Link className='hover:text-red-600' to="/about#faqs">FAQs</Link></li>
                        <li><Link className='hover:text-red-600' to="/#vehicles">Vehicles</Link></li>
                        </ul>
                    </div>

                    {/* social media + contact */}
                    <div className="flex flex-col items-end justify-center gap-1">
                        <h1 className="text-red-500 text-3xl font-bold">
                            <a href="tel:+971561382222">+971561382222</a>
                        </h1>
                        <h1 className="text-white text-2xl font-medium">
                            <a href="mailto:info@herocarrental.com">info@herocarrental.com</a>
                        </h1>
                        <h1 className="text-white text-2xl font-medium">
                            <a href="https://maps.google.com/?q=Abu+Hail%2C+Dubai+UAE">Abu Hail, Dubai UAE</a>
                        </h1>
                        <a href="https://www.instagram.com/hero_rentcars/?utm_medium=copy_link">
                            <img width={40} className='hover:opacity-50 mt-4' src={logoInstagram} alt="" />
                        </a>
                    </div>

                </div>

                {/* copyrights */}
                <div className="mx-auto mt-8">
                    <p className="text-lg text-white text-center">Copyright &copy; 2025. All rights reserved.</p>
                </div>

            </div>

        </>
    )
}

export default Footer