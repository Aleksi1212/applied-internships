import { Link } from "react-router-dom"

import { useEffect, useState } from "react"

function AddInternship() {
    async function addCompany(event: any) {
        event.preventDefault()

        const testPost = await fetch('http://localhost:3000/postNew', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFsZWtzaUFkbWluIiwicGFzc3dvcmQiOiJKbzltS1d4ZDEiLCJpYXQiOjE2NzgyMDI0MTYsImV4cCI6MTY3ODIwMjQ0Nn0.AE2YE_SQNXbR8iMV6wN7dr7QXJhqoSr-MMMheNvrA_Q'
            }
        })

        const testResult = await testPost.json()
        console.log(testResult)
    }

    return (
        <section className="w-full h-[100vh] flex flex-col items-center bg-[#F6F7F9]">
            <h1 className="text-3xl absolute top-10 border-b-2 border-[#2F2F2F]">Add New Internship</h1>
            <Link to="/" className="back absolute">
                Back To Table
            </Link>

            <div className="w-[25rem] h-[12rem] bg-white rounded-lg shadow-md flex justify-center items-center mt-32">
                <form className="flex flex-col h-full w-[60%] justify-evenly" onSubmit={addCompany}>
                    <input type="text" placeholder="Company Name" name="company" className="pl-2 border-b-2 border-[#2F2F2F] outline-none" />
                    <input type="text" placeholder="Applied Date" name="date" className="pl-2 border-b-2 border-[#2F2F2F] outline-none" />

                    <button type="submit" className="rounded-md bg-[#2F2F2F] text-white h-[1.5rem] text-sm">Add Company</button>
                </form>
            </div>
        </section>
    )
}

export default AddInternship