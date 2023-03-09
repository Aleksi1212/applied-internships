import { Link } from "react-router-dom"

import { useState, useEffect } from "react"

import error from '../images/error.png'
import success from '../images/success.png'

import AlertBox from "./alertBox"

interface alertTypes {
    message: string
    image: string
    bottom: string
}

function EditInternsip() {
    const [alert, setAlert] = useState<alertTypes>({ message: 'message', image: success, bottom: '-5rem' })
    const [authToken, setAuthToken] = useState<string>('')

    useEffect(() => {
        const token = localStorage.getItem('AuthToken') || ''
        setAuthToken(token)
    }, [])


    async function editStatus(event: any) {
        event.preventDefault()

        const companyId = event.target.id.value
        const companyStatus = event.target.status.value
        const accepted_rejected_date = new Date(event.target.date.value).toLocaleDateString('en-GB')

        const editCompanyStatus = await fetch('http://localhost:3000/update', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ companyId: companyId, companyStatus: companyStatus, accepted_rejected_date: accepted_rejected_date })
        })

        const editStatusResult = await editCompanyStatus.json()

        if (editStatusResult.type === 'success') {
            setAlert({ message: editStatusResult.message, image: success, bottom: '2.5rem' })
        } else {
            setAlert({ message: editStatusResult.message, image: error, bottom: '2.5rem'  })
        }

        event.target.reset()
    }
    

    if (authToken.length <= 0) {
        return <h1>Unauthorized</h1>
    }

    return (
        <section className="w-full h-[100svh] flex flex-col items-center relative overflow-hidden">
            <h1 className="text-3xl absolute top-10 border-b-2 border-[#2F2F2F]">Edit Company Status</h1>
            <Link to="/" className="back absolute">
                Back To Table
            </Link>

            <AlertBox alert={{
                message: alert.message,
                image: alert.image,
                bottom: alert.bottom,
                buttons: true,
                buttonText: 'Edit Another'
            }} />

            <div className="w-[25rem] h-[15rem] bg-white rounded-lg shadow-md mt-32 flex justify-center">
                <form onSubmit={editStatus} className="flex flex-col justify-evenly w-[60%]">
                    <input type="number" name="id" className="inputField" placeholder="Company Id" required />
                    <input type="text" name="status" className="inputField" placeholder="Company Status" required />
                    <input type="date" name="date" className="inputField" placeholder="Accepted/Rejected Date" required />

                    <button type="submit" className="formButton">Edit Company</button>
                </form>
            </div>
        </section>
    )
}

export default EditInternsip