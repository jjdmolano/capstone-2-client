import { useContext } from 'react'
import UserContext from '../UserContext'
import { Container, CardDeck, Card, Image } from 'react-bootstrap'
import Head from 'next/head'

export default function home() {
    const { user } = useContext(UserContext)

  return(
    <>
    <Head><title>Budget Tracker</title></Head>
    {
    (user.id === null)
    ?   <Container className="error-container" fluid>
            <a href="/">
                <Image className="error-img" src="/errorlog.svg" fluid />
            </a>
        </Container>
    :   <CardDeck className="card-deck">
        <Card as="a" href="/categories">
            <Card.Img variant="top" id="categories-img" src="/categories.png" />
            <Card.Body>
            <Card.Title><strong>CATEGORIES</strong></Card.Title>
            <Card.Text>
                Add or delete a category.
            </Card.Text>
            </Card.Body>
        </Card>
        <Card as="a" href="/records">
            <Card.Img variant="top" id="records-img" src="/records.png" />
            <Card.Body>
            <Card.Title><strong>RECORDS</strong></Card.Title>
            <Card.Text>
                Add, update or remove the records you created.
            </Card.Text>
            </Card.Body>
        </Card>
        <Card as="a" href="/trends">
            <Card.Img variant="top" id="trends-img" src="/trends.png" />
            <Card.Body>
            <Card.Title><strong>TRENDS</strong></Card.Title>
            <Card.Text>
                Check out the changes to your balance over time.
            </Card.Text>
            </Card.Body>
        </Card>
        <Card as="a" href="/breakdown">
            <Card.Img variant="top" id="breakdown-img" src="/breakdown.png" />
            <Card.Body>
            <Card.Title><strong>BREAKDOWN</strong></Card.Title>
            <Card.Text>
                View the breakdown of your records in a donut chart.
            </Card.Text>
            </Card.Body>
        </Card>
        </CardDeck>
    }
    </>
  )
}
