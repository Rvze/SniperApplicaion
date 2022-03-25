import React from "react";
import MainForm from "./MainForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AppHeader from "../../components/Header/AppHeader";

class MainPage extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Container>
                <AppHeader/>
                <Row>
                    <Col>
                        <MainForm/>
                    </Col>

                </Row>
            </Container>
        )
    }
}

export default MainPage;