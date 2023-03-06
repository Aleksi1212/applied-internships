import { Link } from "react-router-dom"

function Table() {
    return (
        <section className="w-full flex flex-col items-center">
            <h1 className="text-3xl border-b-2 border-[#2F2F2F] absolute top-10">Applied Internships</h1>
            <Link to="/addCompany" className="left-10 top-32 fixed bg-[#2F2F2F] rounded-md text-white w-[10rem] flex justify-center items-center h-[2rem] hover:brightness-90 active:scale-95">
                Add New Internship
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
                    <tr className="bg-white">
                        <td className="border px-4 py-2">Data 1</td>
                        <td className="border px-4 py-2">Data 2</td>
                        <td className="border px-4 py-2">Data 3</td>
                        <td className="border px-4 py-2">Data 4</td>
                        <td className="border px-4 py-2">test</td>
                    </tr>

                    <tr className="bg-white">
                        <td className="border px-4 py-2">Data 1</td>
                        <td className="border px-4 py-2">Data 2</td>
                        <td className="border px-4 py-2">Data 3</td>
                        <td className="border px-4 py-2">Data 4</td>
                        <td className="border px-4 py-2">test</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}

export default Table