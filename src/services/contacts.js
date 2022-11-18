import axios from "axios";

export const baseURL = 'https://636e854dbb9cf402c803ff03.mockapi.io'

export const client = axios.create({baseURL})

export const clientURL = {
    contacts: '/contacts'
}


export const getContactsService = async () => {
    try {
        const response = await client.get(clientURL.contacts)
        return response;
    }
    catch (error) {
        return error.response;
    }
}

