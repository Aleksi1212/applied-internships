import { Link } from "react-router-dom"

import { useState, FormEvent, SyntheticEvent, useEffect } from "react"

import showPasswordIcon from '../images/showPassword.png'
import hidePasswordIcon from '../images/hidePassword.png'

function LogIn() {
    const [passwordState, setPasswordState] = useState<boolean>(true)

    async function logIn(event: any) {
        event.preventDefault()

        const userName = event.target.adminName.value
        const password = event.target.adminPassword.value

        const logInAdmin = await fetch('http://localhost:3000/logIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ adminName: userName, adminPassword: password })
        })

        const getAuthToken = await logInAdmin.json()

        localStorage.setItem('AuthToken', getAuthToken)
    }

    return (
        <section className="w-full h-[100vh] flex flex-col items-center">
            <h1 className="text-3xl absolute top-10 border-b-2 border-[#2F2F2F]">Log In</h1>
            <Link to="/" className="back absolute">
                Back To Table
            </Link>

            <div className="w-[25rem] h-[12rem] bg-white rounded-lg shadow-md mt-32 flex justify-center">
                <form onSubmit={logIn} className="flex flex-col justify-evenly w-[60%]">
                    <input type="text" className="outline-none pl-2 border-b-2 border-[#2F2F2F]" placeholder="Admin Name" name="adminName" required />

                    <div className="w-full flex justify-between relative">
                        <input type={passwordState ? 'password' : 'text'} className="outline-none pl-2 border-b-2 w-full border-[#2F2F2F]" id="passwordField" placeholder="Admin Password" name="adminPassword" required />

                        <button className="absolute right-2" onClick={() => setPasswordState(!passwordState)} type="button" id="passwordStateButton">
                            <img src={passwordState ? showPasswordIcon : hidePasswordIcon} alt="passwordIcon" width={22} />
                        </button>

                        <div id="passwordPopup" className="absolute text-xs right-[-7.5rem] top-1 bg-[#2F2F2F] text-white w-[7rem] rounded-md text-center transition-all scale-0 origin-left duration-200">
                            {passwordState ? 'Show Password' : 'Hide Password'}
                        </div>
                    </div>

                    <button className="bg-[#2F2F2F] rounded-md text-white text-sm h-[1.5rem]" type="submit">Log In</button>
                </form>
            </div>
        </section>
    )
}

export default LogIn