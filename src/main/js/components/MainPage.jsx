import React from "react";
import MainForm from "./MainForm";
import Header from "./Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Svg} from "../graph/graph";
import {Graph} from "./Graph"

class MainPage extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Container>
                <Header/>
                <Row>
                    <Col>
                        <Graph/>
                    </Col>
                    <Col>
                        <MainForm/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default MainPage;