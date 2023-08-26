import { useState } from 'react';
import axios from 'axios';

export default function useGetEvents() {
    const [ events, setEvents ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    //setting the seconds to variable - default is always 0
    const getEvents = async (timer) => {
        try {
            setLoading(true)

            setTimeout(async () => {
                const response = await axios.get("https://api2.queuing4oranges.com/events/read.php")
                const data = response.data;
    
                setEvents(data);
                setLoading(false);

            }, timer)

        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

  return {
     events, loading, error, getEvents
  } 
}

