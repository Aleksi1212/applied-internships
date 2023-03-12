async function checkToken(token: string) {
    try {
        const checkAuthToken = await fetch('http://localhost:8080/checkToken', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const tokenState = await checkAuthToken.json()

        return tokenState

    } catch(err) {
        return { token: 'error', state: false }
    }
}

export default checkToken