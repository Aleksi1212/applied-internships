'use strict';

import connection from "../config.mjs";
import mariadb from 'mariadb'

const CONNECT_TO_DB = await mariadb.createConnection(connection)


async function getAll(orderByValue, direction) {
    try {
        const query = `SELECT * FROM applied_internships ORDER BY ${orderByValue} ${direction}`
        const getAll_Internships = await CONNECT_TO_DB.query(query)

        return getAll_Internships

    } catch(err) {
        return [{ id: 'error', company: 'error', application_status: 'error', applied_date: 'error', accepted_rejected_date: 'error' }]
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
            CONNECT_TO_DB.query(query, [companyName, 'pending', applied_date, '-'])
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
            CONNECT_TO_DB.query(`
                UPDATE applied_internships
                SET application_status = '${newStatus}', accepted_rejected_date = '${accepted_rejected_date}'
                WHERE id = ${id}
            `)
        ])

        return updateInternshipPromise[0].status === 'fulfilled' ? {
            message: 'Status Updated Succesfully', type: 'success'
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