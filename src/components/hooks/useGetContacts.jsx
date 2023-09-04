import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useGetContacts() {
    const [ contacts, setContacts ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    // useEffect(() => {
    const getContacts = async () => {
        try {
            setLoading(true)

            const response = await axios.get("https://api2.queuing4oranges.com/contacts/read.php")
            const data = await response.data;
            setContacts(data);
            setLoading(false);

        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };
    // getContacts();
    // }, [])

  return {
     contacts, loading, error, getContacts
  }
}