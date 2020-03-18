import React, { Component } from "react";
import { Link } from "react-router-dom";
import ls from "local-storage";
import axios from "axios";
import {
  Form,
  Button,
  Col,
  InputGroup,
  FormGroup,
  FormControl,
  ListGroup,
  Navbar,
  Nav,
  Alert,
  Table,
  ControlLabel
} from "react-bootstrap";

export default class PlacedProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      shows: "",
      showe: ""
    };
  }

  VendorNavbar = () => {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#">Home</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href={"/vendor/" + this.props.match.params.id + "/add"}>
              Add
            </Nav.Link>
            <Nav.Link href={"/vendor/" + this.props.match.params.id + "/view"}>
              View
            </Nav.Link>
            <Nav.Link
              href={"/vendor/" + this.props.match.params.id + "/placed"}
            >
              Placed
            </Nav.Link>
            <Nav.Link
              href={"/vendor/" + this.props.match.params.id + "/dispatched"}
            >
              Dispatched
            </Nav.Link>
            <Link className="nav-link" to="/login" onClick={e => ls.clear()}>
              LogOut
            </Link>
          </Nav>
        </Navbar>
      </React.Fragment>
    );
  };

  fetchInfo = () => {
    axios
      .post("http://localhost:4000/product/view", {
        username: this.props.match.params.id,
        status: "placed"
      })
      .then(response => {
        this.setState({ product: response.data });
      })
      .catch(function(error) {
        console.log(error.message);
      });
  };

  componentDidMount() {
    this.fetchInfo();
    this.interval = setInterval(() => {
      this.fetchInfo();
    }, 3000);
  }

  handleClick = (e, id) => {
    axios
      .post("http://localhost:4000/product/changeStatus", {
        id: id,
        status: "dispatched"
      })
      .then(response => {
        this.setState({
          shows: "Product Dispatched Successfully!",
          showe: "",
          product: this.state.product.filter(row => row._id !== id)
        });
      })
      .catch(error => {
        this.setState({ showe: error.message, shows: "" });
      });
  };

  HandleAlert = () => {
    return (
      <React.Fragment>
        {this.state.showe !== "" && (
          <Alert
            key="general"
            variant={this.state.showe !== "" ? "danger" : "light"}
            onClose={() => this.setState({ showe: "" })}
            dismissible
          >
            {this.state.showe}
          </Alert>
        )}

        {this.state.shows !== "" && (
          <Alert
            key="general"
            variant={this.state.shows !== "" ? "success" : "light"}
            onClose={() => this.setState({ shows: "" })}
            dismissible
          >
            {this.state.shows}
          </Alert>
        )}
      </React.Fragment>
    );
  };

  View = () => {
    let table = [];
    let body = [];
    let row = [];
    row.push(<th>{"Name"}</th>);
    row.push(<th>{"Price"}</th>);
    row.push(<th>{"Quantity"}</th>);
    row.push(<th>{"Dispatch"}</th>);
    body.push(<tr>{row}</tr>);
    table.push(<thead>{body}</thead>);
    body = [];
    for (let i in this.state.product) {
      row = [];
      row.push(<td>{this.state.product[i]["name"]}</td>);
      row.push(<td>{this.state.product[i]["price"]}</td>);
      row.push(<td>{this.state.product[i]["quantity"]}</td>);
      row.push(
        <td>
          <Button
            variant="success"
            value={this.state.product[i]["_id"]}
            onClick={e => this.handleClick(e, this.state.product[i]["_id"])}
          >
            Dispatch
          </Button>
        </td>
      );
      body.push(<tr>{row}</tr>);
    }
    table.push(<tbody>{body}</tbody>);
    return (
      <Table striped bordered hover variant="dark">
        {table}
      </Table>
    );
  };

  componentWillMount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <React.Fragment>
        {ls.get("username") === this.props.match.params.id &&
          ls.get("userType") === "vendor" && (
            <React.Fragment>
              <this.VendorNavbar />
              <br />
              <this.HandleAlert />
              <this.View />
            </React.Fragment>
          )}
      </React.Fragment>
    );
  }
}
