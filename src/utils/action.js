import axios from "axios"
import getBrowserFingerprint from 'get-browser-fingerprint'

const baseUrl = "https://vodapermadi-vodapermadi-b786f8e8.koyeb.app/mongodb"
const config = {
    "db": "agc",
    "ds": "Cluster0",
    "key": "FkwowMISgmdrqwWwt6yWQjrwgZCWRtIgxtnk3oS1ckrnO8BifLumjtWVZV30g37A",
    "url": "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-utmyaki/endpoint/data/v1/action"
}

const checkFp = (fingerprint) => {
    const fp = getBrowserFingerprint()
    if (fingerprint === null) return String(fp)
    if (String(fp) !== fingerprint) return false
    if (String(fp) === fingerprint) return true
}

export const checkUser = async (id) => {
    try {
        let newCFG = {
            ...config,
            col: "users",
            option: {
                filter: {
                    id_user: id
                }
            },
        }
        const { data } = await axios.post(`${baseUrl}/getData`, JSON.stringify(newCFG), {
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (data.length > 0) {
            if (data[0].fingerprint !== null) return checkFp(data[0].fingerprint)
            updateOne("users",{ id_user: id }, { fingerprint: checkFp(data[0].fingerprint) })
            postOne('setting', {
                "id_user": data[0].id_user,
                "setup": {
                    "title": {
                        "align": "left",
                        "size": "10px",
                        "width": "base",
                        "type": "italic"
                    },
                    "image": {
                        "align": "left",
                        "size": "50%",
                        "border": "15px"
                    },
                    "date": {
                        "align": "left",
                        "size": "10px",
                        "width": "semibold"
                    },
                    "heroSection": {
                        "enable": true,
                        "size": "300px",
                        "color": "#f3f3f3"
                    },
                    "background": {
                        "color": "#f3f3f3"
                    },
                    "adsLocation": {
                        "location": "top"
                    },
                    "content":{
                        "align":"left"
                    }
                }})
            return true
        } else {
            return false
        }
    } catch (e) {
        return e
    }
}

export const getData = async (col, filter) => {
    try {
        let newCFG = {
            ...config,
            col: col,
            option: filter,
        }
        const { data } = await axios.post(`${baseUrl}/getData`, JSON.stringify(newCFG), {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (e) {
        return e
    }
}

export const postMany = async (col, val) => {
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

export const postOne = async (col, val) => {
    try {
        let newCFG = {
            ...config,
            col: col,
            val: val,
        }
        const { data } = await axios.post(`${baseUrl}/insertOne`, JSON.stringify(newCFG), {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (e) {
        return e
    }
}

export const deleteOne = async (col, filter) => {
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

export const updateOne = async (col,fil, val) => {
    try {
        let newCFG = {
            ...config,
            col:col,
            fil: fil,
            val: val
        }
        const { data } = await axios.post(`${baseUrl}/updateOne`, JSON.stringify(newCFG), {
            headers: {
                "Content-Type": "application/json"
            }
        })

        return data
    } catch (error) {
        return error
    }
}

export const convertImageToBase64 = (url, callback) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = function () {
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
