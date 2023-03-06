function AddInternship() {
    return (
        <section className="w-full h-[100vh] flex flex-col items-center bg-[#F6F7F9]">
            <h1 className="text-3xl absolute top-10 border-b-2 border-[#2F2F2F]">Add New Internship</h1>

            <div className="w-[25rem] h-[10rem] bg-white rounded-lg shadow-md flex justify-center items-center mt-32">
                <form action="" className="flex flex-col h-full w-[60%] gap-y-5 py-10">
                    <input type="text" placeholder="Company Name" name="company" className="pl-2 border-b-2 border-[#2F2F2F] outline-none" />

                    <button type="submit" className="rounded-md bg-[#2F2F2F] text-white h-[2rem]">Add Company</button>
                </form>
            </div>
        </section>
    )
}

export default AddInternship