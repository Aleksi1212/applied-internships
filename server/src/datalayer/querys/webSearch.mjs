import dotenv from 'dotenv'

dotenv.config()

async function getInfoAboutCompany(companyName) {
    try {
        const webSearch = await fetch(`https://api.bing.microsoft.com/v7.0/search?q=${companyName}&count=10`, {
            method: 'GET',
            headers: {
                'Ocp-Apim-Subscription-Key': process.env.BING_SEARCH_API_KEY
            }
        })

        const webSearchResult = await webSearch.json()
        const filterWebSearch = webSearchResult.webPages.value.filter(item => item.language === 'fi' || item.language === 'en')

        return { webPages: filterWebSearch[0], type: 'success' }

    } catch(err) {
        return { webPages: err.message, type: 'error' }
    }
}

export default getInfoAboutCompany