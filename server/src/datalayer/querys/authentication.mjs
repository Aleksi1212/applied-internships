'use strict';

import connection from '../config.mjs';
import mariadb from 'mariadb'

import validateInput from './inputValidation.mjs';

const CONNECT_TO_DB = await mariadb.createConnection(connection)


async function getAdmin(name, password) {
    try {
        const validate_Input = validateInput(name, password)
        if (!validate_Input.valid1 || !validate_Input.valid2) {
            return { message: 'Malicious Input Detected', data:[], type: 'error' }
        }

        const query = 'SELECT * FROM admin_user WHERE username = ? AND userPassword = ?'
        const getAdminData = await CONNECT_TO_DB.query(query, [name, password])

        if (getAdminData.length <= 0) {
            return { message: 'Invalid Username Or Password', data: [], type: 'error' }
        }

        return { message: 'Successfully Logged In', data: getAdminData, type: 'success' }

    } catch(err) {
        return { message: 'Error', data: [], type: 'error' }
    }
}

async function invalidateToken(token) {
    try {
        const query = 'INSERT INTO invalid_tokens VALUES(?)'
        const invalidate_token = await Promise.allSettled([
            CONNECT_TO_DB.query(query, [token])
        ])

        return invalidate_token[0].status === 'fulfilled' ? {
            message: 'Token invalidated', type: 'success'
        } : {
            message: invalidate_token[0].reason.message, type: invalidate_token[0].reason.constructor.name
        }

    } catch(err) {
        return { message: err.message, type: err.constructor.name }
    }
}

async function checkTokenValidity(token) {
    try {
        const query = 'SELECT * FROM invalid_tokens WHERE tokens = ?'
        const checkToken = await CONNECT_TO_DB.query(query, [token])

        return checkToken.length <= 0 ? {
            tokenValid: true, type: 'success'
        } : {
            tokenValid: false, type: 'error'
        }

    } catch(err) {
        return { tokenValid: false, type: 'error' }
    }
}

export {
    getAdmin,
    invalidateToken,
    checkTokenValidity
}