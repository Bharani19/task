import React, { Component } from "react"
import { Card, Button, Row, Col, CardBody, Container, Label } from "reactstrap"
import "./App.css"
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: 1,
            adults: 1,
            children: 0,
            incrDisable: false,
            incrDisableA: false,
            incrDisableC: false,
            decrDisable: true,
            decrDisableA: true,
            decrDisableC: true,
        }
        this.handleDecrement = this.handleDecrement.bind(this);
        this.handleIncrement = this.handleIncrement.bind(this);
        this.handleIncrementAdult = this.handleIncrementAdult.bind(this);
        this.handleDecrementAdult = this.handleDecrementAdult.bind(this);
        this.handleIncrementChild = this.handleIncrementChild.bind(this);
        this.handleDecrementChild = this.handleDecrementChild.bind(this);
        this.handleContraints = this.handleContraints.bind(this);
    }
    handleIncrement() {
        let { rooms, adults, children, incrDisable, incrDisableA, incrDisableC, decrDisable, decrDisableA, decrDisableC } = this.state;
        let sum = adults + children;
        if (rooms >= 1 && rooms < 5) {
            rooms++;
            if (rooms > sum) {
                adults++;
            }
        }
        this.handleContraints(rooms, adults, children, incrDisable, incrDisableA, incrDisableC, decrDisable, decrDisableA, decrDisableC)
    }

    handleIncrementAdult() {
        let { rooms, adults, children, incrDisable, incrDisableA, incrDisableC, decrDisable, decrDisableA, decrDisableC } = this.state;
        if (adults >= 1) {
            adults++;
        }
        this.handleContraints(rooms, adults, children, incrDisable, incrDisableA, incrDisableC, decrDisable, decrDisableA, decrDisableC)
    }
    handleIncrementChild() {
        let { rooms, adults, children, incrDisable, incrDisableA, incrDisableC, decrDisable, decrDisableA, decrDisableC } = this.state;
        if (children >= 0) {
            children++;
        }
        this.handleContraints(rooms, adults, children, incrDisable, incrDisableA, incrDisableC, decrDisable, decrDisableA, decrDisableC)
    }
    handleDecrement() {
        let { rooms, adults, children, incrDisable, incrDisableA, incrDisableC, decrDisable, decrDisableA, decrDisableC } = this.state;
        let sum = adults + children;
        if (rooms > 1 || rooms <= 5) {
            rooms--;
            while (sum > (4 * rooms)) {
                if (children != 0) {
                    children--;
                }
                else {
                    adults--;
                }
                sum = children + adults;
            }
        }
        this.handleContraints(rooms, adults, children, incrDisable, incrDisableA, incrDisableC, decrDisable, decrDisableA, decrDisableC)
    }
    handleDecrementAdult() {
        let { rooms, adults, children, incrDisable, incrDisableA, incrDisableC, decrDisable, decrDisableA, decrDisableC } = this.state;
        if (adults >= 2) {
            adults--;
        }
        this.handleContraints(rooms, adults, children, incrDisable, incrDisableA, incrDisableC, decrDisable, decrDisableA, decrDisableC)
    }

    handleDecrementChild() {
        let { rooms, adults, children, incrDisable, incrDisableA, incrDisableC, decrDisable, decrDisableA, decrDisableC } = this.state;
        if (children >= 1) {
            children--;
        }
        this.handleContraints(rooms, adults, children, incrDisable, incrDisableA, incrDisableC, decrDisable, decrDisableA, decrDisableC)
    }
    handleContraints(rooms, adults, children, incrDisable, incrDisableA, incrDisableC, decrDisable, decrDisableA, decrDisableC) {
        let room = rooms;
        let adult = adults;
        let child = children;
        let sum = adult + child;
        if (sum > (4 * room)) {
            if (room >= 5) {
                return;
            }
            room++;
        }
        else if (sum < room) {
            --room;
        }
        if (adult > 1) {
            incrDisableA = false;
            decrDisableA = false;
        }
        else  {
            decrDisableA = true;
        }
        if (children > 0) {
            decrDisableC = false;
            incrDisableC = false;
        }
        else {
            decrDisableC = true
        }
        if (room <= 5) {
            decrDisable = false;
        }
        else {
            decrDisable = true;
        }
        if (room >= 5) {
            incrDisable = true;
            if (sum >= 4 * room) {
                incrDisableA = true;
                incrDisableC = true;
            }
            else {
                incrDisableA = false;
                incrDisableC = false;
            }
        }
        else {
            incrDisable = false;
        }
        if (room > 1) {
            decrDisable = false;
        }
        else {
            decrDisable = true
        }
        this.setState({ rooms: room, adults: adult, children: child, incrDisable: incrDisable, incrDisableA: incrDisableA, incrDisableC: incrDisableC, decrDisable: decrDisable, decrDisableA: decrDisableA, decrDisableC: decrDisableC });
    }
    render() {
        return (
            <div >
                <div className="container" >
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="8"  >
                                <h2 >Choose number of <b> people</b></h2>
                                <Card style={{ padding: "10px", borderColor: "black" }}>
                                    <CardBody>
                                        <div class="row" >
                                            <label class="col" style={{ marginTop: "15px" }}>ROOMS</label>
                                            <div class="col-12 col-sm-auto">
                                                <Button className="btn-circle" style={{ backgroundColor: "navy" }} onClick={this.handleDecrement} disabled={this.state.decrDisable}>-</Button>
                                                {this.state.rooms}
                                                <Button className="btn-circle" style={{ backgroundColor: "red" }} onClick={this.handleIncrement} disabled={this.state.incrDisable}>+</Button>
                                            </div>
                                        </div><hr />                                       
                                        <div class="row">
                                            <label class="col" style={{ marginTop: "15px" }}>ADULTS</label>
                                            <div class="col-12 col-sm-auto">
                                                <Button className="btn-circle" style={{ backgroundColor: "navy" }} onClick={this.handleDecrementAdult} disabled={this.state.decrDisableA}>-</Button>
                                                {this.state.adults}
                                                <Button className="btn-circle" style={{ backgroundColor: "red" }} onClick={this.handleIncrementAdult} disabled={this.state.incrDisableA}>+</Button>
                                            </div>
                                        </div> <hr />
                                        <div class="row">
                                            <label class="col" style={{ marginTop: "15px" }}>CHILDREN</label>
                                            <div class="col-12 col-sm-auto">
                                                <Button className="btn-circle" style={{ backgroundColor: "navy" }} onClick={this.handleDecrementChild} disabled={this.state.decrDisableC}>-</Button>
                                                {this.state.children}
                                                <Button className="btn-circle" style={{ backgroundColor: "red" }} onClick={this.handleIncrementChild} disabled={this.state.incrDisableC}>+</Button>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}
export default App;