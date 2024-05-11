import axios from "axios"

const baseUrl = "https://olympic-eadie-staykimin.koyeb.app/API/Content"

export const getContent = async(limit,site) => {
    try {
        const {data} = await axios.post(baseUrl, {limit:limit,site:['kompas.com','detik.com']}, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (error) {
        return error
    }
}