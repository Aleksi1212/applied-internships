import { Link } from "react-router-dom"

import { useState, useEffect } from "react"

import showPasswordIcon from '../images/showPassword.png'
import hidePasswordIcon from '../images/hidePassword.png'
import error from '../images/error.png'
import success from '../images/success.png'

import AlertBox from "./alertBox"

interface alertTypes {
    message: string
    image: string
    bottom: string
}

function LogIn() {
    const [passwordState, setPasswordState] = useState<boolean>(true)
    const [alert, setAlert] = useState<alertTypes>({ message: 'message', image: success, bottom: '-5rem' })
    
    const [authToken, setAuthToken] = useState<string>('')

    useEffect(() => {
        const token = localStorage.getItem('AuthToken') || ''
        setAuthToken(token)

        if (alert.bottom != '-5rem') {
            setTimeout(() => {
                setAlert({ ...alert, bottom: '-5rem' })
            }, 2000);
        }
    }, [alert])


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

        if (getAuthToken.type === 'success') {
            localStorage.setItem('AuthToken', getAuthToken.token)
            setAlert({ message: 'Succesfully Logged In', image: success, bottom: '2.5rem' })
        } else {
            setAlert({ message: 'Invalid Username Or Password', image: error, bottom: '2.5rem' })
        }

        event.target.reset()
    }


    if (authToken.length > 0 && alert.message === 'message') {
        return (
            <section className="w-full h-[100svh] flex relative justify-center bg-[#F6F7F9]">
                <h1 className="text-3xl absolute top-10 border-b-2 border-[#2F2F2F]">Already Logged In</h1>

                <div className="absolute flex flex-col text-white gap-y-2 top-32">
                    <Link to="/" className="statusScreenButton">Back To Table</Link>
                    <Link to="/addCompany" className="statusScreenButton">Add New Company</Link>
                    <Link to="/editStatus" className="statusScreenButton">Edit Company Status</Link>
                </div>
            </section>
        )
    }

    return (
        <section className="w-full h-[100svh] flex flex-col items-center relative overflow-hidden">
            <h1 className="text-3xl absolute top-10 border-b-2 border-[#2F2F2F]">Log In</h1>
            <Link to="/" className="back absolute">
                Back To Table
            </Link>

            <AlertBox alert={{
                message: alert.message,
                image: alert.image,
                bottom: alert.bottom,
                buttons: false,
                buttonText: ''
            }} />

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

                    <button className="formButton" type="submit">Log In</button>
                </form>
            </div>
        </section>
    )
}

export default LogIn