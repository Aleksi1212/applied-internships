import connection from "./config.mjs";
import mariadb from 'mariadb'

const connectToDb = await mariadb.createConnection(connection)

async function getAll(orderByValue, orderBy) {
    try {
        if (orderBy) {
            const getAll_Internships_InOrder = await connectToDb.query(`SELECT * FROM applied_internships ORDER BY ${orderByValue}`)
            return getAll_Internships_InOrder
        }

        const getAll_Internships = await connectToDb.query('SELECT * FROM applied_internships')
        return getAll_Internships

    } catch(err) {
        return 'error'
    }
}

async function addNewInternship(companyName) {
    try {
        const currentDate = new Date()

        const addNewInternshipPromise = await Promise.allSettled([
            connectToDb.query(`
                INSERT INTO applied_internships (company, application_status, applied_date, accepted_rejected_date)
                VALUES(
                    ${companyName}, pending, ${currentDate.toLocaleDateString('en-US')}, -
                )
            `)
        ])

        return addNewInternshipPromise[0].status === 'fulfilled' ? {
            message: 'Added Succesfully', type: 'success'
        } : {
            message: addNewInternshipPromise[0].reason.message, type: addNewInternshipPromise[0].reason.constructor.name
        }

    } catch(err) {
        return { message: 'Error', type: 'error' }
    }
}

async function updateInternship(id, newStatus, accepted_rejected_date) {
    try {
        const updateInternshipPromise = await Promise.allSettled([
            connectToDb.query(`
                UPDATE applied_internships
                SET application_status = ${newStatus}, accepted_rejected_date = ${accepted_rejected_date}
                WHERE id = ${id}
            `)
        ])

        return updateInternshipPromise[0].status === 'fulfilled' ? {
            message: 'Updated Succesfully', type: 'success'
        }: {
            message: updateInternshipPromise[0].reason.message, type: updateInternshipPromise[0].reason.constructor.name
        }

    } catch(err) {
        return { message: 'Error', type: 'error' }
    }
}

export {
    getAll,
    addNewInternship,
    updateInternship
}