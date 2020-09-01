import { Row, Col, ListGroup } from 'react-bootstrap'
import DeleteRecordButton from '../components/DeleteRecordButton'
import UpdateRecordModal from './UpdateRecordModal'

export default function RecordList({records, categories, setRecords}) {
    return (
        <ListGroup>
                {records.map(record => {
                    const recordDate = new Date(record.dateAdded).toLocaleString('en-US',{
                        month:'numeric',
                        day:'numeric',
                        year:'numeric',
                        weekday:'long',
                        hour:'2-digit',
                        minute:'2-digit',
                        second: '2-digit'
                    })
                    return (
                        <ListGroup.Item key={record._id}>
                        <Row>
                            <Col className="col-2">{record.categoryName}</Col>
                            <Col className="col-1">{record.categoryType}</Col>
                            <Col className="col-2">{record.description}</Col>
                            <Col className="col-1">{Math.abs(record.amount)}</Col>
                            <Col className="col-4">{recordDate}</Col>
                            <Col className="col-2">
                            <UpdateRecordModal record={record} categories={categories} setRecords={setRecords} />
                            <DeleteRecordButton recordId={record._id} setRecords={setRecords} />
                            </Col>
                        </Row>
                        </ListGroup.Item>
                    )
                }).reverse()}
                </ListGroup>
    )
}