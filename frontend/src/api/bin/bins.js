import axios from "axios"
import { BASE_URL, token } from "../../ultils/axiosApi"

export const bins = [
    {
        id: 1,
        "createdAt": "2022-10-18T16:17:55.740Z",
        "latitude": 21.0927815454556,
        "longitude": 105.68434334543,
        "maxWeight": 156,
        "height": "Bin 1",
        "status": "empty",
        "updatedAt": "2022-10-18T16:17:55.740Z",
        "weight": 123,
    },
    {
        id: 2,
        "createdAt": "2022-10-18T16:17:55.740Z",
        "latitude": 21.0927815454556,
        "longitude": 105.68434334543,
        "maxWeight": 156,
        "height": "Bin 1",
        "status": "empty",
        "updatedAt": "2022-10-18T16:17:55.740Z",
        "weight": 123,
    },
    {
        id: 3,
        "createdAt": "2022-10-18T16:17:55.740Z",
        "latitude": 21.0927815454556,
        "longitude": 105.68434334543,
        "maxWeight": 156,
        "height": "Bin 1",
        "status": "empty",
        "updatedAt": "2022-10-18T16:17:55.740Z",
        "weight": 123,
    },
    {
        id: 4,
        "createdAt": "2022-10-18T16:17:55.740Z",
        "latitude": 21.0927815454556,
        "longitude": 105.68434334543,
        "maxWeight": 156,
        "height": "Bin 1",
        "status": "empty",
        "updatedAt": "2022-10-18T16:17:55.740Z",
        "weight": 123,
    },
    {
        id: 5,
        "createdAt": "2022-10-18T16:17:55.740Z",
        "latitude": 21.0927815454556,
        "longitude": 105.68434334543,
        "maxWeight": 156,
        "height": "Bin 1",
        "status": "empty",
        "updatedAt": "2022-10-18T16:17:55.740Z",
        "weight": 123,
    },
    {
        id: 6,
        "createdAt": "2022-10-18T16:17:55.740Z",
        "latitude": 21.0927815454556,
        "longitude": 105.68434334543,
        "maxWeight": 156,
        "height": "Bin 1",
        "status": "empty",
        "updatedAt": "2022-10-18T16:17:55.740Z",
        "weight": 123,
    },
    {
        id: 7,
        "createdAt": "2022-10-18T16:17:55.740Z",
        "latitude": 21.0927815454556,
        "longitude": 105.68434334543,
        "maxWeight": 156,
        "height": "Bin 1",
        "status": "empty",
        "updatedAt": "2022-10-18T16:17:55.740Z",
        "weight": 123,
    },
    {
        id: 8,
        "createdAt": "2022-10-18T16:17:55.740Z",
        "latitude": 21.0927815454556,
        "longitude": 105.68434334543,
        "maxWeight": 156,
        "height": "Bin 1",
        "status": "empty",
        "updatedAt": "2022-10-18T16:17:55.740Z",
        "weight": 123,
    },
    {
        id: 9,
        "createdAt": "2022-10-18T16:17:55.740Z",
        "latitude": 21.0927815454556,
        "longitude": 105.68434334543,
        "maxWeight": 156,
        "height": "Bin 1",
        "status": "empty",
        "updatedAt": "2022-10-18T16:17:55.740Z",
        "weight": 123,
    },
    {
        id: 10,
        "createdAt": "2022-10-18T16:17:55.740Z",
        "latitude": 21.0927815454556,
        "longitude": 105.68434334543,
        "maxWeight": 156,
        "height": "Bin 1",
        "status": "empty",
        "updatedAt": "2022-10-18T16:17:55.740Z",
        "weight": 123,
    },
]

export const getBinsData = async (companyId) => {
    let response = null;
    if (companyId === undefined || companyId === null) {
        response = await axios.get("/bins", { headers: { token: token } });
    } else {
        response = await axios.get(`/bins?companyId=${companyId}`, { headers: { token: token } });
    }
    return response.data.data;
}