import { Row, Col, ListGroup } from 'react-bootstrap'
import DeleteCategoryButton from '../components/DeleteCategoryButton'
import styles from './CategoryList.module.css'

export default function CategoryList({categories, setCategories}) {
    // set colors for income/expense
    const incomeStyle = {color: "#588E29"}
    const expenseStyle = {color: "#C8040E"}

    return (
        <ListGroup className={styles.listContainer}>
            {categories.map(category => {

                const categoryStyle = (category.categoryType === 'Income') ? incomeStyle : expenseStyle

                return (
                    <ListGroup.Item key={category._id} className={styles.list}>
                    <Row className={styles.listItems}>
                        <Col className={styles.listItemLabels}>{category.categoryName}</Col>
                        <Col className={styles.listItemLabels} style={categoryStyle}>{category.categoryType}</Col>
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