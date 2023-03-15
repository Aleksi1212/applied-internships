
import { Link } from "react-router-dom"

interface companyData {
    companyName: string
    url: string
    snippet: string
    show: boolean
    action: any
    mobile: boolean
}

interface aboutCompany {
    aboutCompany: companyData
}

function InfoBox({ aboutCompany }: aboutCompany) {
    const { companyName, url, snippet, show, action, mobile } = aboutCompany || {}

    if (mobile) {
        return (
            <div className="fixed w-full h-full flex justify-center transition-all duration-200 origin-top"
                style={{ scale: show ? '1' : '0', backdropFilter: 'brightness(50%)' }}>

                <div className="w-[25rem] h-[20rem] mt-44 bg-white rounded-md shadow-lg p-6 flex flex-col justify-between">

                    <div className="flex flex-col gap-y-3">
                        <h1 className="text-xl w-max border-b-2 border-[#2F2F2F]">{`About ${companyName}`}</h1>

                        <div className="w-full max-h-[12rem] overflow-auto text-lg" id="infoBox"
                            style={{ overflowWrap: 'break-word' }}>
                            {snippet}
                        </div>
                    </div>

                    <div className="w-full flex justify-between text-lg">
                        <Link to={url} target="_blank" className="hover:text-blue-500 active:scale-95 relative" id="url">
                            <h1>Company Website</h1>
                            <div className="absolute bottom-0 bg-blue-500 w-full h-[1px] hidden" id="border"></div>
                        </Link>

                        <button onClick={() => action({ companyName: companyName, url: url, snippet: snippet, show: false })} className="hover:opacity-60 active:scale-95">Close</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed xxl:right-10 xl:right-5 top-36 xxl:w-[25rem] xxl:h-[20rem] xl:w-[17.5rem] xl:h-[15rem] bg-white rounded-md shadow-lg p-6 flex flex-col justify-between transition-all duration-200 origin-center"
            style={{ scale: show ? '1' : '0' }}>

            <div className="flex flex-col gap-y-3">
                <h1 className="text-base xxl:text-xl w-max border-b-2 border-[#2F2F2F]">{`About ${companyName}`}</h1>

                <div className="w-full xl:max-h-[8rem] xxl:max-h-[12rem] overflow-auto xxl:text-lg xl:text-sm" id="infoBox"
                    style={{ overflowWrap: 'break-word' }}>
                    {snippet}
                </div>
            </div>

            <div className="w-full flex justify-between xl:text-sm xxl:text-lg">
                <Link to={url} target="_blank" className="hover:text-blue-500 active:scale-95 relative" id="url">
                    <h1>Company Website</h1>
                    <div className="absolute bottom-0 bg-blue-500 w-full h-[1px] hidden" id="border"></div>
                </Link>

                <button onClick={() => action({ companyName: companyName, url: url, snippet: snippet, show: false })} className="hover:opacity-60 active:scale-95">Close</button>
            </div>
        </div>
    )
}

export default InfoBox