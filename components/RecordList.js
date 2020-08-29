import { Row, Col, ListGroup } from 'react-bootstrap'
import DeleteRecordButton from '../components/DeleteRecordButton'

export default function RecordList({records}) {
    return (
        <ListGroup>
                {records.map(record => {
                    return (
                        <ListGroup.Item key={record._id}>
                        <Row>
                            <Col className="col-2">{record.categoryName}</Col>
                            <Col className="col-1">{record.amount}</Col>
                            <Col className="col-2">{record.categoryType}</Col>
                            {record.description.length > 0
                            ? <Col className="col-1">{record.description}</Col>
                            : null
                            }
                            <Col className="col-1">{record.balanceAfterTransaction}</Col>
                            <Col className="col-3">{record.dateAdded}</Col>
                            <Col className="col-2">
                            <DeleteRecordButton recordId={record._id} />
                            </Col>
                        </Row>
                        </ListGroup.Item>
                    )
                })}
                </ListGroup>
    )
}