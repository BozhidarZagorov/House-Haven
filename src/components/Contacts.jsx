import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router'
import emailjs from '@emailjs/browser'
import { useAuth } from '/public/ctx/FirebaseAuth'


import { Field, Label, Switch } from '@headlessui/react'

export default function About() {
    const [agreed, setAgreed] = useState(false)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { user, isAuthenticated } = useAuth(); //! auth ctx


    const titleRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef()
    const messageRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            navigate("/login"); // Redirect to login if not auth
            return alert('You must be logged in to send E-mails.');
        }

        if (!agreed) {
            alert('You must first agree to our Privacy Policy by checking the box below to send E-mails!')
            return // returns if privacy policy is not selected
        }

        const templateParams = {
            title: titleRef.current.value,
            name: `${firstNameRef.current.value} ${lastNameRef.current.value}`,
            time: new Date().toLocaleString(),//Time of sending
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            message: messageRef.current.value,
        };
        setLoading(true);

        try {
            const response = await emailjs.send(
                "service_vxaed3q",   // EmailJS Service ID
                "template_6g0b55n",  // EmailJS Template ID
                templateParams,
                "X7q7ds9xZYDEmgDFj"    // EmailJS Public Key
            );
    
            if (response.status === 200) {
                // console.log("Email sent");
                navigate("/");
            } else {
                console.error("Error sending email:", response);
            }
        } catch (err) {
            console.error("Request failed:", err);
        }
        // console.log("Sending email with:", templateParams);
        // console.log(Object.fromEntries(templateParams));
    }

    if (loading) return <div className="flex items-center justify-center min-h-screen">
                           <span className="flex justify-center mt-5">
                               <svg className="spinner" />
                            </span>
                        </div>


    return (
        <div className="contactground-container">
            <div className="mx-auto max-w-2xl text-center mt-10">
                <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">Contact us</h2>
                <p className="mt-2 text-lg/8 text-white">Send us an E-mail if you have any questions about your upcoming adventure</p>
            </div>
            <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-10">
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm/6 font-semibold text-white">
                            Title
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="title"
                                name="title"
                                type="text"
                                required
                                ref={titleRef}
                                className="block w-full rounded-md bg-white opacity-70 px-3.5 py-2 text-base text-white-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600"
                            />
                        </div>
                    </div>
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="first-name" className="block text-sm/6 font-semibold text-white">
                            First name
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="first-name"
                                name="first-name"
                                type="text"
                                required
                                autoComplete="given-name"
                                ref={firstNameRef}
                                className="block w-full rounded-md bg-white opacity-70 px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="last-name" className="block text-sm/6 font-semibold text-white">
                            Last name
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="last-name"
                                name="last-name"
                                type="text"
                                required
                                autoComplete="family-name"
                                ref={lastNameRef}
                                className="block w-full rounded-md bg-white opacity-70 px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm/6 font-semibold text-white">
                            Email
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                ref={emailRef}
                                className="block w-full rounded-md bg-white opacity-70 px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="phone-number" className="block text-sm/6 font-semibold text-white">
                            Phone number
                        </label>
                        <div className="mt-2.5">
                            <div className="flex rounded-md bg-white opacity-70 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-orange-600">
                                <input
                                    id="phone-number"
                                    name="phone-number"
                                    type="text"
                                    required
                                    placeholder="123-456-7890"
                                    ref={phoneRef}
                                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm/6 font-semibold text-white">
                            Message
                        </label>
                        <div className="mt-2.5">
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                required
                                className="block w-full rounded-md bg-white opacity-70 px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600"
                                ref={messageRef}
                                defaultValue={''}
                            />
                        </div>
                    </div>
                    <Field className="flex gap-x-4 sm:col-span-2">
                        <div className="flex h-6 items-center">
                            <Switch
                                checked={agreed}
                                onChange={setAgreed}
                                className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 opacity-90 p-px ring-1 ring-gray-900/5 transition-colors duration-200 ease-in-out ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 data-checked:bg-orange-600"
                            >
                                <span className="sr-only">Agree to policies</span>
                                <span
                                    aria-hidden="true"
                                    className="size-4 transform rounded-full bg-white ring-1 shadow-xs ring-gray-900/5 transition duration-200 ease-in-out group-data-checked:translate-x-3.5"
                                />
                            </Switch>
                        </div>
                        <Label className="text-sm/6 text-white">
                            By selecting this, you agree to our{' '}
                            <Link to="/privacyPolicy" className="font-semibold text-orange-600">
                                Privacy&nbsp;Policy
                            </Link>
                            .
                        </Label>
                    </Field>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        disabled={loading}  
                        className="block w-full btn-orange"
                    >
                    {loading ? 'Sending E-mail' : 'Send E-mail'}
                        
                    </button>
                    {loading ? 
                        <span className="flex justify-center mt-5">
                            <svg className="spinner"></svg>
                        </span> 
                    : null }
                    
                </div>
            </form>
        </div>
    )
}
