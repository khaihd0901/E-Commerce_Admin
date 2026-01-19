import api from '../../utils/api';
import { base_url } from '../../utils/base_url';
const getUserOrders = async()=>{
    const res = await api.get(`${base_url}/user/get-all-orders`)
    return res.data
}

const orderService = {
    getUserOrders,  
}

export default orderService