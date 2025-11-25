import config from './config.json'

const { SERVER_API } = config
const BASE_URL = `${SERVER_API}/api/payments`

export const updatePaymentStatus = async(orderId) => {
    try {
        const url = `${BASE_URL}/${orderId}/status?` + new URLSearchParams({status: 'PAID'})

        const res = await fetch(url, {method:'PUT'})

        if (!res.ok){
            console.error(`Fetch failed: ${res.status} ${res.statusText}`);
            throw new Error(`Server returned ${res.status}`);
        }

        return await res.json();
    }
    catch(err) {
        console.error("Error Setting Order's payment status: ", err);
    }
}