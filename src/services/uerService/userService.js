import api from '../../utils/api'
import {base_url}  from "../../utils/base_url";

const getUsers = async()=>{
    const res = await api.get(`${base_url}/user`)
    return res.data
}

const userService = {
    getUsers
}

export default userService