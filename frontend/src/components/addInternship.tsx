import { Link } from "react-router-dom"

import { useEffect, useState } from "react"

import error from '../images/error.png'
import success from '../images/success.png'

import AlertBox from "./alertBox"

interface alertType {
    message: string
    image: string
    bottom: string
}

function AddInternship() {
    const [authToken, setAuthToken] = useState<string>('')
    const [alert, setAlert] = useState<alertType>({ message: 'message', image: success, bottom: '-5rem' })

    useEffect(() => {
        const token = localStorage.getItem('AuthToken') || ''
        setAuthToken(token)

        if (alert.bottom !== '-5rem') {
            setTimeout(() => {
                setAlert({ ...alert, bottom: '-5rem' })
            }, 2000);
        }
    }, [alert])


    async function addCompany(event: any) {
        event.preventDefault()

        const company = event.target.companyName.value
        const appliedDate = new Date(event.target.date.value).toLocaleDateString('en-GB')

        const postNew = await fetch('http://localhost:3000/postNew', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ companyName: company, appliedDate: appliedDate })
        })

        const postNewResult = await postNew.json()
        
        if (postNewResult.type === 'success') {
            setAlert({ message: postNewResult.message, image: success, bottom: '2.5rem' })
        } else {
            setAlert({ message: postNewResult.message, image: error, bottom: '2.5rem' })
        }

        event.target.reset()
    }


    if (authToken.length <= 0) {
        return <h1>Unauthorized</h1>
    }

    return (
        <section className="w-full h-[100svh] flex flex-col relative items-center bg-[#F6F7F9] overflow-hidden">
            <h1 className="text-3xl absolute top-10 border-b-2 border-[#2F2F2F]">Add New Internship</h1>
            <Link to="/" className="back absolute">
                Back To Table
            </Link>
            <AlertBox alert={{
                message: alert.message,
                image: alert.image,
                bottom: alert.bottom,
                buttons: true,
                buttonText: 'Add New'
            }} />

            <div className="w-[25rem] h-[12rem] bg-white rounded-lg shadow-md flex justify-center items-center mt-32">
                <form className="flex flex-col h-full w-[60%] justify-evenly" onSubmit={addCompany}>
                    <input type="text" placeholder="Company Name" name="companyName" className="pl-2 border-b-2 border-[#2F2F2F] outline-none" required />
                    <input type="date" placeholder="Applied Date" name="date" className="pl-2 border-b-2 border-[#2F2F2F] outline-none" required />

                    <button type="submit" className="formButton">Add Company</button>
                </form>
            </div>

        </section>
    )
}

export default AddInternship