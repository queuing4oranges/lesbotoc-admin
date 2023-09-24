import { useEffect, useState } from 'react'; 
import axios from 'axios';
import swal from 'sweetalert';
import { useForm } from 'react-hook-form';

//Contacts
export function useGetContacts() {
    const [ contacts, setContacts ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)

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

  return {
     contacts, loading, error, getContacts, setContacts
  }
}

export function useDeleteContact() {
    const [ deletedContact, setDeletedContact ] = useState(false);
    const [ loading, setLoading ] = useState();
    const [ error, setError ] = useState();

    const deleteContact = (id) => {
		setDeletedContact(false)
        swal({
        title: "Sure?",
        text: "Do you REALLY want to delete this precious contact?",
        icon: "warning",
        dangerMode: true,
        })
        .then((willDelete) => {
            if(willDelete){
                axios
          .delete(`https://api2.queuing4oranges.com/contacts/delete.php/${id}`)
          .then(function(response){
            if(response.status === 200) {
                swal(
                "Deleted!",
                "It will never bother you again. Promised.",
                "success"
                );
                setDeletedContact(true)
            } else if (response.status === 500) {
                console.log(response.message)
            }
          })
        }
        })
    }
    
    
    return {
        deletedContact, setDeletedContact, loading, error, deleteContact
    }
}

//Events
export function useGetEvents() {
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

export function useShowEvent() {
    const [ oneEvent, setOneEvent ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)


    const showEvent = async (id) => {
    try {
        setLoading(true)
        const response = await axios.get(`https://api2.queuing4oranges.com/events/single_read.php/${id}`)
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

//Images
export function useGetImages() {
    const [ images, setImages ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    const getImages = async () => {
        try {
            setLoading(true)

            setTimeout(async () => {
                const response = await axios.get("https://api2.queuing4oranges.com/images/read.php")
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
