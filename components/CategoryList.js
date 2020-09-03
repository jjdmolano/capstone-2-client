import { Row, Col, ListGroup } from 'react-bootstrap'
import DeleteCategoryButton from '../components/DeleteCategoryButton'
import styles from './CategoryList.module.css'

export default function CategoryList({categories, setCategories}) {
    return (
        <ListGroup className={styles.listContainer}>
            {categories.map(category => {
                return (
                    <ListGroup.Item key={category._id} className={styles.list}>
                    <Row className={styles.listItems}>
                        <Col className={styles.listItemLabels}>{category.categoryName}</Col>
                        <Col className={styles.listItemLabels}>{category.categoryType}</Col>
                        <Col className={styles.buttonContainer}>
                            <DeleteCategoryButton className={styles.button} categoryId={category._id} setCategories={setCategories} />
                        </Col>
                    </Row>
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    )
}