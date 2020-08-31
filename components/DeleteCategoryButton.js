import { useContext } from 'react'
import Router from 'next/router'
import UserContext from '../UserContext'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'

export default function DeleteCategoryButton({categoryId}) {
    const {user} = useContext(UserContext)
    const deleteCategory = (categoryId) => {
        Swal.fire({
            text: 'Are you sure you want to delete this category? All records with this category will also be deleted',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: '#DC3545',
            cancelButtonText: 'Cancel'
        })
        .then((result) => {
            result.value
            ?   fetch(`http://localhost:4000/api/users/${user.id}/${categoryId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
                })
                .then((res => res.json()))
                .then((data) => {
                    data
                    ?   Swal.fire({
                        text: 'Deleted category!',
                        icon: 'success',
                        timer: 1000,
                        timerProgressBar: true,
                        showConfirmButton: false
                        })
                        .then((result) => {
                            result.dismiss === Swal.DismissReason.timer
                                ? Router.reload()
                                : Router.reload()
                        })
                    :   Swal.fire({
                        text: 'Delete error!',
                        icon: 'error',
                        timer: 1000,
                        timerProgressBar: true,
                        showConfirmButton: false
                        })
                        .then((result) => {
                            result.dismiss === Swal.DismissReason.timer
                            ? Router.reload()
                            : Router.reload()
                        })
                })
            : null
        })
    }

    return(
        <Button variant="danger" block onClick={() => deleteCategory(categoryId)} >Delete</Button>
    )
}