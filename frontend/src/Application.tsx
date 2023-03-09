import { Routes, Route, Link } from "react-router-dom"

import Table from "./components/table"
import LogIn from "./components/logIn"
import AddInternship from "./components/addInternship"
import EditInternsip from "./components/editInternship"

function App() {
    return (
        <Routes>
            <Route path="/" element={<Table />} />
            <Route path="/logIn" element={<LogIn />} />
            <Route path="/addCompany" element={<AddInternship />} />
            <Route path="/editStatus" element={<EditInternsip />} />
        </Routes>
    )
}

export default App