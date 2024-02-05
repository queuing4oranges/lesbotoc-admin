import { useState } from 'react';
import axios from 'axios';

export default function useShowContact() {
    const [ oneContact, setOneContact ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)
    const [ shownContact, setShownContact ] = useState(false)


    const showContact = async (id) => {
    try {
        setLoading(true)
		const response = await axios.get(`https://api.lesbotoc.com/contacts/single_read.php/${id}`)
        const data = response.data;
        setOneContact(data)
        setLoading(false)
    } catch (error){
        setError(error)
        setLoading(false)
    }
    };

    return {
        oneContact, loading, error, showContact, setShownContact
    }
}
