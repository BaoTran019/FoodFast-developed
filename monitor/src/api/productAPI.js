import config from './config.json'

const { SERVER_API } = config;
const BASE_URL = `${SERVER_API}/api/products`;

export const fetchMenu = async () => {
    try {
        const res = await fetch(BASE_URL)

        if (!res.ok) {
            console.error(`Fetch failed: ${res.status} ${res.statusText}`);
            throw new Error(`Server returned ${res.status}`);
        }

        const data = await res.json();

        // Trả về luôn mảng rỗng nếu dữ liệu null để tránh crash ở FE
        return Array.isArray(data) ? data : [];
    }
    catch (err) {
        console.error("Error fetching menu:", err);
        return [];
    }
}

export const setStatus = async (productId, status) => {
    try {
        const url = `${BASE_URL}/${productId}/status?` +
            new URLSearchParams({ status: status })
        console.log('product status url: ', url)

        const res = await fetch(url, {
            method: 'PUT'
        })

        if (!res.ok) {
            console.error(`Fetch failed: ${res.status} ${res.statusText}`);
            throw new Error(`Server returned ${res.status}`);
        }
    }
    catch (err) {
        console.error("Error update product status:", err);
    }
}

export const changeInfo = async (productId, item) => {
    try {
        const res = await fetch(`${BASE_URL}/${productId}/change-info`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                productName: item.productName,
                description: item.description,
                price: Number(item.price),
                imageUrl: item.imageUrl,
                available: Boolean(item.available),
                categoryId: Number(item.category)
            })
        })

        if (!res.ok){
            console.error(`Fetch failed: ${res.status} ${res.statusText}`);
            throw new Error(`Server returned ${res.status}`);
        }
    }

    catch (err) {
        console.error("Error Edit product information:", err);
    }
}

export const addProduct = async (item) => {
    try {
        const res = await fetch(`${BASE_URL}/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                productName: item.productName,
                description: item.description,
                price: Number(item.price),
                imageUrl: item.imageUrl,
                available: Boolean(item.available),
                categoryId: Number(item.category)
            })
        })

        if (!res.ok){
            console.error(`Fetch failed: ${res.status} ${res.statusText}`);
            throw new Error(`Server returned ${res.status}`);
        }
    }
    catch (err) {
        console.error("Error Add product:", err);
    }
}

export const deleteProduct = async (productId) => {
    try {
        const res = await fetch(`${BASE_URL}/${productId}`,{
            method: 'DELETE'
        })

        if (!res.ok){
            console.error(`Fetch failed: ${res.status} ${res.statusText}`);
            throw new Error(`Server returned ${res.status}`);
        }
    }
    catch (err) {
        console.error("Error Delete product:", err);
    }
}