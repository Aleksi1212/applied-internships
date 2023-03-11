
async function logOut(token: string) {
    try {
        const invalidateToken = await fetch('http://localhost:3000/logOut', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token })
        })

        const logOutResult = await invalidateToken.json()
        return logOutResult

    } catch(err: any) {
        return { message: err.message, type: err.constructor.name }
    }
}

export default logOut