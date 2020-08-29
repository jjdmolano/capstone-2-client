import { useContext } from 'react'
import Router from 'next/router'
import UserContext from '../UserContext'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'

export default function DeleteCategoryButton({categoryId}) {
    const {user} = useContext(UserContext)
    const deleteCategory = (categoryId) => {
        fetch(`http://localhost:4000/api/users/${user.id}/${categoryId}`, {
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
                icon: 'success'
                })
                .then((result) => {
                    result.value
                    ? Router.reload()
                    : null
                })
            :   Swal.fire({
                text: 'Delete error!', icon: 'error'
                })
        })
    }

    return(
        <Button variant="danger" onClick={() => deleteCategory(categoryId)} >Delete</Button>
    )
}