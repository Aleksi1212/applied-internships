'use strict';

import connection from "./config.mjs";
import mariadb from 'mariadb'

const connectToDb = await mariadb.createConnection(connection)

async function getAdmin(name, password) {
    try {
        const query = 'SELECT * FROM admin_user WHERE username = ? AND userPassword = ?'
        const getAdminData = await connectToDb.query(query, [name, password])

        if (getAdminData.length <= 0) {
            return { message: 'No data', data: [], type: 'error' }
        }

        return { message: 'Success', data: getAdminData, type: 'success' }

    } catch(err) {
        return { message: 'Error', data: [], type: 'error' }
    }
}

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

async function addNewInternship(companyName, applied_date, authenticated) {
    try {
        if (!authenticated) {
            return { message: 'Unauthorized', type: 'error' }
        }
        
        const query = `
            INSERT INTO applied_internships (company, application_status, applied_date, accepted_rejected_date)
            VALUES(?, ?, ?, ?)
        `

        const addNewInternshipPromise = await Promise.allSettled([
            connectToDb.query(query, [companyName, 'pending', applied_date, '-'])
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
                SET application_status = '${newStatus}', accepted_rejected_date = '${accepted_rejected_date}'
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
    getAdmin,
    getAll,
    addNewInternship,
    updateInternship
}