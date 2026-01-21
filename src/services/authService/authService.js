
import {base_url} from '../../utils/base_url';
import api from '../../utils/api';

const login = async(userData) =>{
    const res = await api.post(`${base_url}/auth/admin-login`, userData)
    console.log(res)
    if(res.data){
        localStorage.setItem("user", JSON.stringify(res.data))
    }
    return res.data
}
const logout = async() =>{
    const res = await api.post(`${base_url}/auth/signout`)
    return res.data
}

 const refreshToken = async () =>{
    try {
      const res = await api.post(`${base_url}/auth/refresh-token`);
      return res.data
    } catch (err) {
        console.log(err)
    }
  }
const authService = {
    login,
    logout,
    refreshToken
}

export default authService