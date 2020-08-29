import { Row, Col, ListGroup } from 'react-bootstrap'
import DeleteCategoryButton from '../components/DeleteCategoryButton'

export default function CategoryList({categories}) {
    return (
        <ListGroup>
            {categories.map(category => {
                return (
                    <ListGroup.Item key={category._id}>
                    <Row>
                        <Col className="col-10">{category.categoryName}</Col>
                        <Col className="col-2">{category.categoryType}</Col>
                        <DeleteCategoryButton categoryId={category._id} />
                    </Row>
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    )
}