import { Link } from "react-router-dom"

import { useEffect, useState } from "react"

import checkToken from "../tokenCheck/checkToken"

interface internshipTypes {
    id: number
    company: string
    application_status: string
    applied_date: string
    accepted_rejected_date: string
}

function Table() {
    const [appliedInternships, setAppliedInternships] = useState<Array<internshipTypes>>([])
    const [authToken, setAuthToken] = useState<string>('')

    useEffect(() => {
        let isMounted = true

        async function getData() {
            const getAllInternships = await fetch('http://localhost:3000/getAll', {
                method: 'GET'
            })

            const checkAuthToken = await checkToken(localStorage.getItem('AuthToken') || '')

            const allToJson = await getAllInternships.json()

            if (isMounted) {
                setAppliedInternships(allToJson)
            }

            // if (!checkAuthToken.state) {
            //     setAuthToken('')
            //     localStorage.setItem('AuthToken', 'none')
            // } else {
            //     setAuthToken(checkAuthToken.token)
            // }
        }

        getData()

        return () => {
            isMounted = false
        }
    }, [])

    return (
        <section className="w-full flex flex-col items-center">
            <h1 className="text-3xl border-b-2 border-[#2F2F2F] absolute top-10">Applied Internships</h1>
            <Link to={authToken.length <= 0 ? '/logIn' : '/addCompany'} className="back fixed">
                {authToken.length <= 0 ? 'Log In' : 'Add New Company'}
            </Link>

            <table className="table-auto w-[60rem] mt-32 shadow-md rounded-tr-md rounded-tl-md bg-[#2F2F2F]">
                <thead >
                    <tr className="text-white">
                        <th className="px-4 py-2">Id</th>
                        <th className="px-4 py-2">Company</th>
                        <th className="px-4 py-2">Application Status</th>
                        <th className="px-4 py-2">Applied Date</th>
                        <th className="px-4 py-2">Accepted / Rejected Date</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        appliedInternships.map((appliedInternship: internshipTypes) => {
                            return (
                                <tr key={appliedInternship.id} style={{ backgroundColor: (appliedInternships.indexOf(appliedInternship)+1) % 2 === 0 ? '#D9D9D9': 'white' }}>
                                    <td className="content">{appliedInternship.id}</td>
                                    <td className="content">{appliedInternship.company}</td>
                                    <td className="content">{appliedInternship.application_status}</td>
                                    <td className="content">{appliedInternship.applied_date}</td>
                                    <td className="content">{appliedInternship.accepted_rejected_date}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </section>
    )
}

export default Table