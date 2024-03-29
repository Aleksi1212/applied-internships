async function getInternships(orderBy: string, direction: boolean) {
    try {
        const getAll_Internships = await fetch(`https://13.53.129.73:3000/getAll/${orderBy}=${direction ? 'ASC' : 'DESC'}`, {
            method: 'GET'
        })
        const all_Internships = await getAll_Internships.json()

        return all_Internships
    } catch(err) {
        return [{ id: 0, company: 'error', application_status: 'error', applied_date: 'error', accpted_rejeceted_date: 'error' }]
    }
}

export default getInternships