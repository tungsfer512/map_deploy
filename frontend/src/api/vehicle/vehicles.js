import axios from "axios"
import {BASE_URL, token} from "../../ultils/axiosApi"


export const getVehiclesData = async () => {
    const response = await axios.get("/vehicles", { headers: { token: token } });
    return response.data.data; 
}




