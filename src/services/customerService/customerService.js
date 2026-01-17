import axios from "axios";
import {base_url}  from "../../utils/base_url";

const getUsers = async(token)=>{
    const res = await axios.get(`${base_url}/user`, token)
    return res.data
}

const customerService = {
    getUsers
}

export default customerService