import { useContext } from 'react'
import Router from 'next/router'
import UserContext from '../UserContext'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'

export default function DeleteCategoryButton({categoryId, setCategories}) {
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
                    ?   fetch('http://localhost:4000/api/users/details', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                        })
                        .then(res => res.json())
                        .then(data => {
                            setCategories(data.categories)
                            Swal.fire({
                            text: 'Deleted category!',
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
        <Button variant="danger" block onClick={() => deleteCategory(categoryId)} >Delete</Button>
    )
}