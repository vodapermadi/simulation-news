import axios from "axios"

const baseUrl = "https://vodapermadi-vodapermadi-b786f8e8.koyeb.app/mongodb"
const config = {
    "db": "agc",
    "ds": "Cluster0",
    "key": "FkwowMISgmdrqwWwt6yWQjrwgZCWRtIgxtnk3oS1ckrnO8BifLumjtWVZV30g37A",
    "url": "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-utmyaki/endpoint/data/v1/action"
}


export const checkUser = async (id) => {
    try {
        let newCFG = {
            ...config,
            col: "users",
            option: {
                filter:{
                    id_telegram:id
                }
            },
        }
        const { data } = await axios.post(`${baseUrl}/getData`, JSON.stringify(newCFG), {
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(data.length > 0){
            return true
        }else{
            return false
        }
    } catch (e) {
        return e
    }
}

export const getData = async(col,filter) => {
    try{
        let newCFG = {
            ...config,
            col:col,
            option:filter,
        }
        const {data} = await axios.post(`${baseUrl}/getData`,JSON.stringify(newCFG),{
            headers: {
                "Content-Type": "application/json"
            }
        })
        return data
    }catch(e){
        return e
    }
}

export const postMany = async(col,val) => {
    try {
        let newCFG = {
            ...config,
            col: col,
            val: val,
        }
        const { data } = await axios.post(`${baseUrl}/insertMany`, JSON.stringify(newCFG), {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (e) {
        return e
    }
}

export const deleteOne = async(col,filter) => {
    try {
        let newCFG = {
            ...config,
            col: col,
            val: filter,
        }
        const { data } = await axios.post(`${baseUrl}/deleteOne`, JSON.stringify(newCFG), {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (e) {
        return e
    }
}

export const convertImageToBase64 = (url, callback) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = function() {
        const canvas = document.createElement('canvas')
        canvas.width = this.width
        canvas.height = this.height

        const ctx = canvas.getContext('2d')
        ctx.drawImage(this, 0, 0)

        const dataURL = canvas.toDataURL('image/png')
        callback(dataURL)
    }

    img.src = url
}
