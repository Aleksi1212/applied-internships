import { Link } from "react-router-dom";

import success from '../images/success.png'
import error from '../images/error.png'

import logOut from "../authentication/logOut";

interface menuData {
    authenticated: boolean
    show: boolean
    alert: any
    changeAuth: any
    windowX: number
}

interface menu {
    menu: menuData
}

function Menu({ menu }: menu) {
    const {  authenticated, show, alert, changeAuth, windowX } = menu || {}

    return (
        <div className="fixed transition-all duration-300 h-full xxl:w-[20rem] xl:w-[17.5rem] md:w-[40rem] shadow-xl bg-white flex flex-col items-center pt-44"
            style={windowX <= 1080 ? { left: show ? '0px' : '-40rem' } : { left: show ? '0px' : '-20rem' }}>

            <div className="w-full flex flex-col items-center gap-y-[2px]">
                {
                    authenticated ? (
                        <div className="menuButtonContainer">
                            <button className="menuButton" onClick={async () => {
                                const logOut_and_invalidateToken = await logOut(localStorage.getItem('AuthToken') || '')

                                if (logOut_and_invalidateToken.type === 'success') {
                                    localStorage.setItem('AuthToken', '')
                                    changeAuth(false)
                                    alert({ message: 'Succesfully Logged Out', image: success, left: '2.5rem' })

                                } else {
                                    alert({ message: 'Error Logging Out', image: error, left: '2.5rem' })
                                }

                            }}>Log out</button>
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
    )
}

export default Menu