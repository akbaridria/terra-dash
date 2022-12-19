
const headers = { "Accept": "application/json", "Content-Type": "application/json", "x-api-key": process.env.SHROOM_KEY }

export const getToken = async (sql_query, axios) => {
    const data = {
        "sql": sql_query,
        "ttlMinutes": 15
    }
    const result = await axios.post('https://node-api.flipsidecrypto.com/queries', data, {headers}) 
    if(result.status === 200) 
        return result.data.token
    else
        return 'failed'
}

export const getData = async (token, axios) => {
    const result = await axios.get(`https://node-api.flipsidecrypto.com/queries/${token}?pageNumber=1&pageSize=9999`, {headers})
    if(result.status === 200) {
        if(result.data.status === 'running') {
            getData(token, axios)
        } else {
            console.log(result)
        }
    }
}