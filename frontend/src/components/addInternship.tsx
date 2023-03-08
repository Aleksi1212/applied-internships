import { Link } from "react-router-dom"

import { useEffect, useState } from "react"

import error from '../images/error.png'
import success from '../images/success.png'

interface alertType {
    message: string
    image: string
    bottom: string
}

function AddInternship() {
    const [authToken, setAuthToken] = useState<string>('')
    const [alert, setAlert] = useState<alertType>({ message: 'success', image: success, bottom: '-5rem' })

    useEffect(() => {
        const token = localStorage.getItem('AuthToken') || ''
        setAuthToken(token)
    }, [])

    async function addCompany(event: any) {
        event.preventDefault()

        const company = event.target.companyName.value
        const appliedDate = new Date(event.target.date.value).toLocaleDateString('en-GB')

        const testPost = await fetch('http://localhost:3000/postNew', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ companyName: company, appliedDate: appliedDate })
        })

        const testResult = await testPost.json()
        console.log(testResult)
    }

    if (authToken.length <= 0) {
        return <h1>Unauthorized</h1>
    }

    return (
        <section className="w-full h-[100vh] flex flex-col items-center bg-[#F6F7F9] overflow-hidden">
            <h1 className="text-3xl absolute top-10 border-b-2 border-[#2F2F2F]">Add New Internship</h1>
            <Link to="/" className="back absolute">
                Back To Table
            </Link>


            <div className="w-[25rem] h-[12rem] bg-white rounded-lg shadow-md flex justify-center items-center mt-32">
                <form className="flex flex-col h-full w-[60%] justify-evenly" onSubmit={addCompany}>
                    <input type="text" placeholder="Company Name" name="companyName" className="pl-2 border-b-2 border-[#2F2F2F] outline-none" />
                    <input type="date" placeholder="Applied Date" name="date" className="pl-2 border-b-2 border-[#2F2F2F] outline-none" />

                    <button type="submit" className="rounded-md bg-[#2F2F2F] text-white h-[1.5rem] text-sm">Add Company</button>
                </form>
            </div>

            <div className="bg-[#2F2F2F] w-[17.5rem] h-[4rem] transition-all duration-200 rounded-md flex flex-col justify-evenly items-center" >
                <div className="w-full flex text-white gap-x-2 px-2">
                    <img src={alert.image} />
                    <p>|</p>
                    <h1>{alert.message}</h1>
                </div>

                <hr className="w-[90%]" />

                <div className="w-full flex justify-center items-center text-xs text-white">
                    <button className="alertLink">Add New</button>

                    <div className="h-[90%] w-[1px] bg-white"></div>
                    <Link to="/" className="alertLink">Back To Table</Link>
                    <div className="h-[90%] w-[1px] bg-white"></div>

                    <button className="alertLink">Close</button>
                </div>
            </div>
        </section>
    )
}

export default AddInternship