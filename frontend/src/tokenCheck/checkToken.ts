async function checkToken(token: string) {
    try {
        const checkAuthToken = await fetch('http://localhost:3000/checkToken', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const tokenState = await checkAuthToken.json()

    } catch(err) {
        return { token: 'error', state: false }
    }
}

export default checkToken