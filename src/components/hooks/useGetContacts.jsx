import { useState } from 'react';
import axios from 'axios';

export default function useGetEvents() {
    const [ contacts, setContacts ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    const getContacts = async () => {
        try {
            setLoading(true)

            const response = await axios.get("https://api2.queuing4oranges.com/contacts/read.php")
            const data = response.data;
            setContacts(data);
            setLoading(false);

        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

  return {
     contacts, loading, error, getContacts
  } 
}