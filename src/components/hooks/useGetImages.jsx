import { useState } from 'react'; 
import axios from 'axios';

export default function useGetImages() {
    const [ images, setImages ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    const getImages = async () => {
        try {
            setLoading(true)

            setTimeout(async () => {
				const response = await axios.get("https://api.lesbotoc.com/images/read.php")
                const data = response.data
    
                setImages(data);
                setLoading(false)
            }, 400)
            
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }
    
    return {
        images, loading, error, getImages
    }
};

