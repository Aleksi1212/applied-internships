import { Routes, Route, Link } from "react-router-dom"

import Table from "./components/table"
import AddInternship from "./components/addInternship"

function App() {
    return (
        <Routes>
            <Route path="/" element={<Table />} />
            <Route path="/addCompany" element={<AddInternship />} />
        </Routes>
    )
}

export default App