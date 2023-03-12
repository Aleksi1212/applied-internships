
import { Link } from "react-router-dom"

interface companyData {
    companyName: string
    url: string
    snippet: string
    show: boolean
    action: any
}

interface aboutCompany {
    aboutCompany: companyData
}

function InfoBox({ aboutCompany }: aboutCompany) {
    const { companyName, url, snippet, show, action } = aboutCompany || {}

    return (
        <div className="fixed right-10 top-36 w-[25rem] h-[20rem] bg-white rounded-md shadow-lg p-6 flex flex-col justify-between transition-all duration-200 origin-center" style={{ scale: show ? '1' : '0' }}>
            <div className="flex flex-col gap-y-3">
                <h1 className="text-xl w-max border-b-2 border-[#2F2F2F]">{`About ${companyName}`}</h1>

                <div className="w-full max-h-[90%] overflow-auto" style={{ overflowWrap: 'break-word' }}>
                    {snippet}
                </div>
            </div>

            <div className="w-full flex justify-between">
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