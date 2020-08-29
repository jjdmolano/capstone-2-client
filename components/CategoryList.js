import { Row, Col, ListGroup } from 'react-bootstrap'
import DeleteCategoryButton from '../components/DeleteCategoryButton'

export default function CategoryList({categories}) {
    return (
        <ListGroup>
            {categories.map(category => {
                return (
                    <ListGroup.Item key={category._id}>
                    <Row>
                        <Col className="col-9">{category.categoryName}</Col>
                        <Col className="col-1">{category.categoryType}</Col>
                        <Col className="col-2">
                            <DeleteCategoryButton categoryId={category._id} />
                        </Col>
                    </Row>
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    )
}