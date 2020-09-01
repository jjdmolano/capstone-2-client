import { useContext } from 'react'
import Router from 'next/router'
import UserContext from '../UserContext'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'

export default function DeleteRecordButton({recordId, setRecords}) {
    const {user} = useContext(UserContext)
    const deleteRecord = (recordId) => {
        Swal.fire({
            text: 'Are you sure you want to delete this record?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: '#DC3545',
            cancelButtonText: 'Cancel'
        })
        .then((result) => {
            result.value
                ?   fetch(`http://localhost:4000/api/users/${user.id}/tr/${recordId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                    })
                    .then((res => res.json()))
                    .then((data) => {
                        data
                        ?   fetch('http://localhost:4000/api/users/details', {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                            })
                            .then(res => res.json())
                            .then(data => {
                                setRecords(data.transactions)
                                Swal.fire({
                                text: 'Deleted record!',
                                icon: 'success',
                                timer: 800,
                                timerProgressBar: true,
                                showConfirmButton: false
                                })
                                .then((result) => {
                                    result.dismiss === Swal.DismissReason.timer
                                    ? null
                                    : null
                                })
                            })
                        :   Swal.fire({
                            text: 'Delete error!',
                            icon: 'error',
                            timer: 800,
                            timerProgressBar: true,
                            showConfirmButton: false
                            })
                            .then((result) => {
                                result.dismiss === Swal.DismissReason.timer
                                ? null
                                : null
                            })
                    })
            : null
        })
    }

    return(
        <Button variant="danger" block onClick={() => deleteRecord(recordId)} >Delete</Button>
    )
}