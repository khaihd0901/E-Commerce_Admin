import axios from 'axios'
import {base_url} from '../../utils/base_url';

const login = async(userData) =>{
    const res = await axios.post(`${base_url}/auth/admin-login`, userData)
    console.log(res)
    if(res.data){
        localStorage.setItem("user", JSON.stringify(res.data))
    }
    return res.data
}
const logout = async() =>{
    const res = await axios.post(`${base_url}/auth/signout`)
    return res.data
}

const authService = {
    login,
    logout
}

export default authService