import { Container, Image } from 'react-bootstrap'

export default function error() {

    return (
        <Container className="error-container" fluid>
            <Image className="error-img" src="/error.svg" fluid></Image>
        </Container>
    )
}