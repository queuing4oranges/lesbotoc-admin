import { useState } from 'react';
import axios from 'axios';

export default function useShowEvent() {
    const [ oneEvent, setOneEvent ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)


    const showEvent = async (id) => {
    try {
        setLoading(true)
		const response = await axios.get(`https://api.lesbotoc.com/events/single_read.php/${id}`)
        const data = response.data;

        setOneEvent(data)
        setLoading(false)
    } catch (error){
        setError(error)
        setLoading(false)
    }
    };

    return {
        oneEvent, loading, error, showEvent
    }
}
