import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import { checkToken } from "../authentication/checkToken"
import getInternships from "../data/getInternships"

import dash from '../images/dash.png'
import sortUp from '../images/sortUp.png'
import sortDown from '../images/sortDown.png'


interface internshipTypes {
    id: number
    company: string
    application_status: string
    applied_date: string
    accepted_rejected_date: string
}

interface orderTypes {
    orderBy: string
    direction: boolean
    clicked: boolean
}

interface headerType {
    inorder: string
    value: string
}

function Table() {
    const [appliedInternships, setAppliedInternships] = useState<Array<internshipTypes>>([])
    const [authenticated, setAuthenticated] = useState<boolean>(false)
    const [menu, setMenu] = useState<boolean>(false)

    const [inOrder, setInorder] = useState<orderTypes>({ orderBy: 'id', direction: true, clicked: false })

    const HEADERS: Array<headerType> = [
        { inorder: 'id', value: 'Id' },
        { inorder: 'company', value: 'Company' },
        { inorder: 'application_status', value: 'Application Status' },
        { inorder: 'applied_date', value: 'Applied Date' },
        { inorder: 'accepted_rejected_date', value: 'Accepted / Rejected Date' }
    ]
    
    useEffect(() => {
        let isMounted = true

        async function getData() {
            const getAll_Internships = await getInternships(inOrder.orderBy, inOrder.direction)
            const checkAuthToken = await checkToken(localStorage.getItem('AuthToken') || '')

            if (isMounted) {
                setAppliedInternships(getAll_Internships)
            }

            if (checkAuthToken.type === 'error') {
                localStorage.setItem('AuthToken', '')
                setAuthenticated(false)
            } else {
                setAuthenticated(true)
            }
        }

        getData()

        return () => {
            isMounted = false
        }
    }, [inOrder])


    return (
        <section className="w-full flex flex-col items-center pb-32">
            <h1 className="text-3xl border-b-2 border-[#2F2F2F] absolute top-10">Applied Internships</h1>

            <div className="fixed transition-all duration-300 h-full w-[20rem] shadow-xl bg-white flex flex-col items-center pt-44" style={{ left: menu ? '0px' : '-20rem' }}>
                <div className="w-full flex flex-col items-center gap-y-[2px]">
                    {
                        authenticated ? (
                            <div className="menuButtonContainer">
                                <button className="menuButton">Log out</button>
                            </div>
                        ) : (
                            <div className="menuButtonContainer">
                                <Link to="/logIn" className="menuButton">Log In</Link>
                            </div>
                        )
                    }

                    <div className="menuButtonContainer flex justify-center">
                        <div className="w-[95%] h-[2px] top-[-2px] bg-[#5d5d5d] absolute"></div>
                        <Link to={authenticated ? '/addCompany' : '/logIn'} className="menuButton">Add New Company</Link>
                    </div>
                    <div className="menuButtonContainer flex justify-center">
                        <div className="w-[95%] h-[2px] top-[-2px] bg-[#5d5d5d] absolute"></div>
                        <Link to={authenticated ? '/editStatus' : '/logIn'} className="menuButton">Edit Company Status</Link>
                    </div>
                </div>
            </div>

            <button onClick={() => setMenu(!menu)} className="fixed left-12 transition-all duration-300 top-12 h-[1.5rem] flex flex-col items-center justify-between">
                <div className={menu ? 'menuBar absolute top-2 rotate-45' : 'menuBar rotate-0'}></div>
                <div className={menu ? 'menuBar opacity-0' : 'menuBar'}></div>
                <div className={menu ? 'menuBar absolute top-2 -rotate-45' : 'menuBar rotate-0'}></div>
            </button>

            <table className="table-auto w-[60rem] mt-32 shadow-md rounded-tr-md rounded-tl-md bg-[#2F2F2F]">
                <thead>
                    <tr className="text-white">
                        {
                            HEADERS.map((header: headerType) => {
                                return (
                                    <th key={header.inorder}>
                                        <button className="headerButton" onClick={() => setInorder({ orderBy: header.inorder, direction: !inOrder.direction, clicked: true })}>
                                            <h1>{header.value}</h1>
                                            <img src={
                                                inOrder.direction && inOrder.clicked && inOrder.orderBy === header.inorder ? sortUp : 
                                                !inOrder.direction && inOrder.clicked && inOrder.orderBy === header.inorder ? sortDown : dash
                                            } alt="headerImage" />
                                        </button>
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        appliedInternships.map((appliedInternship: internshipTypes) => {
                            return (
                                <tr key={appliedInternship.id} style={{ backgroundColor: (appliedInternships.indexOf(appliedInternship)+1) % 2 === 0 ? '#D9D9D9': 'white' }} className="hover:brightness-90">
                                    <td className="content">{appliedInternship.id}</td>
                                    <td className="content">{appliedInternship.company}</td>
                                    <td className="content">{appliedInternship.application_status}</td>
                                    <td className="content">{new Date(appliedInternship.applied_date).toLocaleDateString('en-GB')}</td>
                                    <td className="content">{appliedInternship.accepted_rejected_date !== null ? new Date(appliedInternship.accepted_rejected_date).toLocaleDateString('en-GB') : '-'}</td>
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