import dotenv from 'dotenv'
dotenv.config()
const API_URL = `http://localhost:5000/services`;


export async function serviceData(){
    const res = await fetch(API_URL);
    return res.json()
}