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
                            <Col className="col-2">{record.amount}</Col>
                            <Col className="col-2">{record.categoryType}</Col>
                            {record.description.length > 0
                            ? <Col className="col-2">{record.description}</Col>
                            : null
                            }
                            <Col className="col-2">{record.balanceAfterTransaction}</Col>
                            <Col className="col-2">{record.dateAdded}</Col>
                            <DeleteRecordButton recordId={record._id} />
                        </Row>
                        </ListGroup.Item>
                    )
                })}
                </ListGroup>
    )
}