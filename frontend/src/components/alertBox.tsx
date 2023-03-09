
import { Link } from "react-router-dom"

interface alertData {
    message: string
    image: string
    bottom: string
    buttons: boolean
    buttonText: string
}

interface alert {
    alert: alertData
}

function AlertBox({ alert }: alert) {
    const { message, image, bottom, buttons, buttonText } = alert || {}

    return (
        <>
            {
                buttons ? (
                    <div style={{ bottom: bottom }} className="absolute bg-[#2F2F2F] w-[17.5rem] h-[4rem] transition-all duration-200 rounded-md flex flex-col justify-evenly items-center" >
                        <div className="w-full flex text-white gap-x-2 px-2">
                            <img src={image} alt="alertImage" />
                            <p>|</p>
                            <h1>{message}</h1>
                        </div>
        
                        <hr className="w-[90%]" />
        
                        <div className="w-full flex justify-center items-center text-xs text-white">
                            <button className="alertLink">{buttonText}</button>
        
                            <div className="h-[90%] w-[1px] bg-white"></div>
                            <Link to="/" className="alertLink">Back To Table</Link>
                            <div className="h-[90%] w-[1px] bg-white"></div>
        
                            <button className="alertLink">Close</button>
                        </div>
                    </div>

                ) : (
                    <div style={{ bottom: bottom }} className="absolute bg-[#2F2F2F] rounded-md h-[2.5rem] gap-x-2 pl-3 pr-4 flex items-center transition-all duration-500 text-white">
                        <img src={image} alt="alertImage" />
                        <span>|</span>
                        <h1>{message}</h1>
                    </div>
                )
            }
        </>
    )
}

export default AlertBox