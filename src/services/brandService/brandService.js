import axios from "axios";
import { base_url } from "../../utils/base_url";

const getBrands = async(token)=>{
    const res = await axios.get(`${base_url}/brand`, token)
    console.log(res.data)
    return res.data
}

const brandService = {
    getBrands,
}

export default brandService