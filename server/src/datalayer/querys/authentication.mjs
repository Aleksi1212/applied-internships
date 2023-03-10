'use strict';

import connection from '../config.mjs';
import mariadb from 'mariadb'

const CONNECT_TO_DB = await mariadb.createConnection(connection)

async function getAdmin(name, password) {
    try {
        const query = 'SELECT * FROM admin_user WHERE username = ? AND userPassword = ?'
        const getAdminData = await CONNECT_TO_DB.query(query, [name, password])

        if (getAdminData.length <= 0) {
            return { message: 'No data', data: [], type: 'error' }
        }

        return { message: 'Success', data: getAdminData, type: 'success' }

    } catch(err) {
        return { message: 'Error', data: [], type: 'error' }
    }
}

async function setAuthToken(token) {
    try {
        const query = 'INSERT INTO admin_user (authToken) VALUES(?)'
        const set_AuthToken = await Promise.allSettled([
            CONNECT_TO_DB.query(query, [token])
        ])

        return set_AuthToken[0].status === 'fulfilled' ? {
            message: 'Succesfully logged in', type: 'success'
        } : {
            message: set_AuthToken[0].reason.message, type: set_AuthToken[0].reason.constructor.name
        }

    } catch(err) {
        return { message: err.message, type: 'error' }
    }
}

export {
    getAdmin,
    setAuthToken
}