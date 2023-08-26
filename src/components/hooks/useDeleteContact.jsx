import { useState } from 'react'; 
import axios from 'axios';
import swal from 'sweetalert';

export default function useDeleteContact() {
    const [ deletedContact, setDeletedContact ] = useState(false);
    const [ loading, setLoading ] = useState();
    const [ error, setError ] = useState();

    const deleteContact = (id) => {
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

