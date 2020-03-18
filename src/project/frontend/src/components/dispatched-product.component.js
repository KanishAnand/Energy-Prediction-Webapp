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

export default class DispatchedProduct extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      review: [],
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
      .post("http://localhost:4000/review/view", {
        vendorname: this.props.match.params.id
      })
      .then(response => {
        axios
          .post("http://localhost:4000/product/view", {
            username: this.props.match.params.id,
            status: "dispatched"
          })
          .then(res => {
            this.setState({ product: res.data, review: response.data });
          })
          .catch(function(error) {
            console.log(error.message);
          });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  componentDidMount() {
    this.fetchInfo();
    this.interval = setInterval(() => {
      this.fetchInfo();
    }, 3000);
  }

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
    row.push(<th>{"Product Name"}</th>);
    row.push(<th>{"User Name"}</th>);
    row.push(<th>{"Rating"}</th>);
    row.push(<th>{"Review"}</th>);
    body.push(<tr>{row}</tr>);
    table.push(<thead>{body}</thead>);
    body = [];
    for (let i in this.state.product) {
      let review = null;
      for (let j in this.state.review) {
        if (this.state.review[j].productName === this.state.product[i].name) {
          review = this.state.review[j];
          break;
        }
      }
      row = [];
      if (review === null) {
        row.push(<td>{this.state.product[i]["name"]}</td>);
        row.push(<td>{"User"}</td>);
        row.push(<td>{"Not Rated Yet"}</td>);
        row.push(<td>{"No Reviews Available"}</td>);
      } else {
        row.push(<td>{review["productName"]}</td>);
        row.push(<td>{review["username"]}</td>);
        row.push(<td>{review["rating"]}</td>);
        row.push(<td>{review["review"]}</td>);
      }
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
