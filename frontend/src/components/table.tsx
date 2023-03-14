import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import checkToken  from "../authentication/validateAuthToken"
import logOut from "../authentication/logOut"
import getInternships from "../data/getInternships"

import dash from '../images/dash.png'
import sortUp from '../images/sortUp.png'
import sortDown from '../images/sortDown.png'
import link from '../images/link.png'
import error from '../images/error.png'
import succes from '../images/success.png'

import InfoBox from "./infoBox"
import AlertBox from "./alertBox"
import Menu from "./menu"


interface internshipTypes {
    id: number
    company: string
    application_status: string
    applied_date: string
    accepted_rejected_date: string
    website_url: string
    web_snippet: string
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

interface companyDataType {
    companyName: string
    url: string
    snippet: string
    show: boolean
}

interface alertTypes {
    message: string
    image: string,
    left: string
}

function Table() {
    const [appliedInternships, setAppliedInternships] = useState<Array<internshipTypes>>([])
    const [authenticated, setAuthenticated] = useState<boolean>(false)

    const [menu, setMenu] = useState<boolean>(false)
    const [companyBox, setCompanyBox] = useState<companyDataType>({ companyName: '', url: '', snippet: 'snippet', show: false })
    const [alert, setAlert] = useState<alertTypes>({ message: 'none', image: succes, left: '-15rem' })

    const [inOrder, setInorder] = useState<orderTypes>({ orderBy: 'id', direction: true, clicked: false })

    const HEADERS: Array<headerType> = [
        { inorder: 'id', value: 'Id' },
        { inorder: 'company', value: 'Company' },
        { inorder: 'application_status', value: 'Application Status' },
        { inorder: 'applied_date', value: 'Applied Date' },
        { inorder: 'accepted_rejected_date', value: 'Accepted / Rejected Date' }
    ]
    
    useEffect(() => {
        document.title = 'Applied Internships - Table'

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

    useEffect(() => {
        if (alert.left !== '-15rem') {
            setTimeout(() => {
                setAlert({ message: alert.message, image: alert.image, left: '-15rem' })
            }, 2000);
        }
    }, [alert])


    return (
        <section className="w-full flex flex-col items-center pb-32">
            <h1 className="text-3xl border-b-2 border-[#2F2F2F] absolute top-10">Applied Internships</h1>
            
            <Menu menu={{
                authenticated: authenticated,
                show: menu,
                alert: setAlert,
                changeAuth: setAuthenticated
            }} />

            <AlertBox alert={{
                message: alert.message,
                image: alert.image,
                positions: { bottom: '10rem', left: alert.left },
                buttons: false,
                buttonText: '',
                position: false
            }} />

            <button onClick={() => setMenu(!menu)} className="fixed left-12 transition-all duration-300 top-12 h-[1.5rem] flex flex-col items-center justify-between">
                <div className={menu ? 'menuBar absolute top-2 rotate-45' : 'menuBar rotate-0'}></div>
                <div className={menu ? 'menuBar opacity-0' : 'menuBar'}></div>
                <div className={menu ? 'menuBar absolute top-2 -rotate-45' : 'menuBar rotate-0'}></div>
            </button>

            <InfoBox aboutCompany={{
                companyName: companyBox.companyName,
                url: companyBox.url,
                snippet: companyBox.snippet,
                show: companyBox.show,
                action: setCompanyBox
            }} />

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
                        <th>Website</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        appliedInternships.map((appliedInternship: internshipTypes) => {
                            return (
                                <tr onClick={() => setCompanyBox({  companyName: appliedInternship.company, url: appliedInternship.website_url, snippet: appliedInternship.web_snippet, show: true })} key={appliedInternship.id} style={{ backgroundColor: (appliedInternships.indexOf(appliedInternship)+1) % 2 === 0 ? '#D9D9D9': 'white' }} className="hover:brightness-95 cursor-pointer">
                                    <td className="content">{appliedInternship.id}</td>
                                    <td className="content">{appliedInternship.company}</td>
                                    <td className="content">{appliedInternship.application_status}</td>
                                    <td className="content">{new Date(appliedInternship.applied_date).toLocaleDateString('en-GB')}</td>
                                    <td className="content">{appliedInternship.accepted_rejected_date !== null ? new Date(appliedInternship.accepted_rejected_date).toLocaleDateString('en-GB') : '-'}</td>
                                    
                                    <td className="border h-[2rem] relative">
                                        <Link to={appliedInternship.website_url} target="_blank" className="h-full w-full top-0 flex justify-center items-center absolute">
                                            <img src={link} alt="link" />
                                        </Link>
                                    </td>
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