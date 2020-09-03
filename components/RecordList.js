import { Row, Col, ListGroup } from 'react-bootstrap'
import DeleteRecordButton from '../components/DeleteRecordButton'
import UpdateRecordModal from './UpdateRecordModal'
import styles from './RecordList.module.css'

export default function RecordList({records, categories, setRecords}) {

    return (
        <ListGroup>
                {records.map(record => {
                    const recordDate = new Date(record.dateAdded).toLocaleString('en-US',{
                        month:'short',
                        day:'numeric',
                        year:'numeric',
                        weekday:'long',
                        hour:'2-digit',
                        minute:'2-digit'
                    })
                    return (
                        <ListGroup.Item className={styles.list} key={record._id}>
                        <Row className={styles.listItems}>
                            <Col className={styles.listItemLabels}>{record.description}</Col>
                            <Col className={styles.listItemLabels}>{Math.abs(record.amount)}</Col>
                            <Col className={styles.listItemLabels}>{record.categoryName}</Col>
                            <Col className={styles.listItemLabels}>{record.categoryType}</Col>
                            <Col className={styles.listItemLabels}>{recordDate}</Col>
                            <Col className={styles.buttonContainer}>
                            <UpdateRecordModal className={styles.button} record={record} categories={categories} setRecords={setRecords} />
                            <DeleteRecordButton className={styles.button} recordId={record._id} setRecords={setRecords} />
                            </Col>
                        </Row>
                        </ListGroup.Item>
                    )
                }).reverse()}
                </ListGroup>
    )
}