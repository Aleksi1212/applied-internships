import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

import error from '../images/error.png'
import success from '../images/success.png'
import table from '../images/table.png'
import add from '../images/add.png'

import AlertBox from "./alertBox"
import useWindowDimensions from "../hooks/windowDimensions"

interface alertTypes {
    message: string
    image: string
    bottom: string
}

function EditInternsip() {
    const [loading, setLoading] = useState<boolean>(false)
    const [alert, setAlert] = useState<alertTypes>({ message: 'message', image: success, bottom: '-5rem' })
    const [authToken, setAuthToken] = useState<string>('')

    const windowDimensions = useWindowDimensions()

    useEffect(() => {
        document.title = 'Applied Internships - Edit Company Status'

        const token = localStorage.getItem('AuthToken') || ''
        setAuthToken(token)

        if (alert.bottom !== '-5rem') {
            setTimeout(() => {
                setAlert({ message: alert.message, image: alert.image, bottom: '-5rem' })
            }, 2000);
        }
    }, [alert])


    async function editStatus(event: any) {
        event.preventDefault()

        const companyId = event.target.id.value
        const companyStatus = event.target.status.value
        const accepted_rejected_date = event.target.date.value

        setLoading(true)

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
            setLoading(false)
            setAlert({ message: editStatusResult.message, image: success, bottom: '2.5rem' })
        } else {
            setLoading(false)
            setAlert({ message: editStatusResult.message, image: error, bottom: '2.5rem'  })
        }

        event.target.reset()
    }
    

    if (authToken.length <= 0) {
        return (
            <section className="w-full h-[100svh] flex relative justify-center bg-[#F6F7F9]">
                <h1 className="text-3xl absolute top-10 border-b-2 border-[#2F2F2F]">Unauthorized</h1>

                <div className="absolute flex flex-col text-white gap-y-2 top-32">
                    <Link to="/logIn" className="statusScreenButton">Log In</Link>
                    <Link to="/" className="statusScreenButton">Back To Table</Link>
                </div>
            </section>
        )
    }

    return (
        <section className="w-full h-[100svh] flex flex-col items-center relative overflow-hidden">
            <h1 className="text-3xl absolute top-10 border-b-2 border-[#2F2F2F]">Edit Company Status</h1>

            <div className="absolute left-10 top-36 flex lg:flex-col gap-y-2 gap-x-4">
                <Link to="/" className="lg:back active:scale-95">
                    {
                        windowDimensions.width < 1080 ? (
                            <img src={table} alt="table" width={35} />
                        ) : (
                            'Back To Table'
                        )
                    }
                </Link>
                <Link to="/editStatus" className="lg:back active:scale-95">
                {
                        windowDimensions.width < 1080 ? (
                            <img src={add} alt="add" width={35} />
                        ) : (
                            'Edit Company Status'
                        )
                    }
                </Link>
            </div>

            <AlertBox alert={{
                message: alert.message,
                image: alert.image,
                positions: { bottom: alert.bottom, left: 'none' },
                buttons: true,
                buttonText: 'Edit Another',
                position: true
            }} />

            <div className="loader absolute top-[40rem]" style={{ scale: loading ? '1' : '0' }}></div>

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