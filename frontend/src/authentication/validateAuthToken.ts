async function checkToken(token: string) {
    try {
        const checkAuthToken = await fetch('https://13.53.129.73:3000/checkToken', {
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