import React from 'react'
import Footer from '../Components/Footer'
import FAQsCard from '../Components/FAQsCard'
import { useNavigate } from 'react-router-dom'

const About = () => {

    const navigate = useNavigate();

    return (
        <>

            {/* navigation bar */}
            <div className="md:flex hidden justify-center py-8 px-16 items-center top-0 fixed w-full z-10 bg-white shadow-xl">

                <img className='left-10 fixed' src="images/logo.png" width="175" alt="" />

                <ul className="flex gap-6 text-black">
                <li><a className='hover:text-red-600' href="/">Home</a></li>
                        <li><a className='hover:text-red-600' href="/about">About Us</a></li>
                        <li><a className='hover:text-red-600' href="#faqs">FAQs</a></li>
                        <li><a className='hover:text-red-600' href="/#vehicles">Vehicles</a></li>
                </ul>

            </div>


            <div className="flex mx-20 text-black mt-40">
                <div className="flex flex-col w-[80%] gap-8">
                    <h1 className="text-5xl font-bold ">About Us</h1>
                    <p className="text-lg text-gray-700 font-medium">
                        At Hero Car Rental, we are dedicated to providing our customers with the best car rental experience in Dubai. With a wide range of vehicles to choose from, competitive prices, and exceptional customer service, we strive to make your rental experience as smooth and stress-free as possible.
                    </p>

                    <p className="text-gray-700">
                        Our fleet of cars includes everything from economy cars to luxury vehicles, so whether you’re traveling for business or pleasure, we have the perfect car to suit your needs. We also offer a variety of rental options, including short-term and long-term rentals, daily, weekly and monthly rentals, to accommodate your specific needs.
                    </p>

                    <div className="px-4 border-left border-l-4 border-l-red-400">
                        <p className="w-[70%] text-gray-700 font-medium text-lg">
                            At Hero Car Rental, we understand that your time is valuable, that's why we offer 24/7 customer support to assist you with any questions or concerns you may have. Our team of experts will guide you through the rental process and ensure that you have a pleasant and enjoyable experience.
                        </p>
                    </div>

                    <p className="text-gray-700">
                        We are committed to providing our customers with the highest level of service and ensure that all our vehicles are well maintained and in excellent condition. Our goal is to make your car rental experience as convenient and hassle-free as possible, so you can focus on enjoying your trip to Dubai.
                    </p>

                </div>

                <div className="p-12">
                    <img src="https://herocarrental.com/wp-content/uploads/2020/12/office.jpg" alt="" className="rounded-2xl" />
                </div>
            </div>

            <div className="flex mx-20 relative gap-4 my-20">
                <img width={300} src="https://herocarrental.com/wp-content/uploads/2020/08/module-13-removebg-preview.png" alt="" className='absolute left-5 bottom-0' />

                <div className="bg-gray-300 rounded-3xl w-[50%] flex h-[400px] pt-20 justify-between px-12">

                    <div className="w=[30%]"></div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-4xl font-bold">Our client says</h3>
                        <p className="text-red-500 text-3xl font-extrabold">"</p>
                        <p className="w-[250px] text-gray-700 italic">Rented a car for a road trip, it was perfect! Highly recommend!</p>
                    </div>
                </div>

                <div className="w-[50%] h-[400px]">
                    <img className="rounded-3xl h-[400px]" src="https://herocarrental.com/wp-content/uploads/2023/01/655465665467-min-1.jpg" alt="" />
                </div>
            </div>

            <div className="flex justify-between m-20">
                <div className="flex px-12">
                    <span className="text-5xl font-extrabold text-red-500 pl-4">10</span>
                    <span className='text-3xl font-bold px-4 w-[150px]'>Years in Business</span>
                </div>

                <div className="flex gap-12 justify-between border-l border-l-gray-700 px-12">
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <p className="text-5xl font-extrabold">2,000+</p>
                        <p className="text-red-500 text-xl">Customers</p>
                    </div>
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <p className="text-5xl font-extrabold">4,500+</p>
                        <p className="text-red-500 text-xl">Cars Rented</p>
                    </div>
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <p className="text-5xl font-extrabold">≈100</p>
                        <p className="text-red-500 text-xl">Cars</p>
                    </div>
                </div>

            </div>

            <div id="faqs" className="flex flex-col m-20 bg-gray-300 rounded-3xl px-20 py-6 gap-4">

                <h1 className="text-5xl font-bold w-full text-center my-8">Frequently Asked Questions</h1>

                <div className="grid grid-cols-2 gap-4 px-8">
                    <div className="flex flex-col gap-4 w-full mx-auto">
                    <FAQsCard question={"Do you offer any sort of warranty?"} answer={"We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history."}/>
                    <FAQsCard question={"When should I get my oil changed?"} answer={"We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history."}/>
                    <FAQsCard question={"How do I check my tire pressure?"} answer={"We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history."}/>
                    <FAQsCard question={"How often should I rotate my tires?"} answer={"We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history."}/>
                    </div>

                    <div className="flex flex-col gap-4 w-full mx-auto">
                    <FAQsCard question={"What is Auto Detailing?"} answer={"We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history."}/>
                    <FAQsCard question={"Is it urgent to fix an oil leak?"} answer={"We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history."}/>
                    <FAQsCard question={"What causes brake pulsation?"} answer={"We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history."}/>
                    <FAQsCard question={"Why is it important to rotate tires?"} answer={"We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history."}/>
                    </div>
                </div>
                
                <button onClick={()=>navigate("/")} className="hover:bg-red-400 w-fit rounded-lg p-4 mx-auto my-8 bg-red-500 text-white text-lg font-medium">Learn More</button>

            </div>

            <Footer />

        </>
    )
}

export default About