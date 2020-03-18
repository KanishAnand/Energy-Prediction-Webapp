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

export default class StatusProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      orders: [],
      shows: "",
      showe: ""
    };
  }

  fetchInfo = () => {
    axios
      .post("http://localhost:4000/customer/view", {
        username: this.props.match.params.id
      })
      .then(response => {
        axios
          .get("http://localhost:4000/product/")
          .then(res => {
            this.setState({ product: res.data, orders: response.data });
          })
          .catch(function(error) {
            console.log(error);
          });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  componentDidMount() {
    this.fetchInfo();
    this.interval = setInterval(() => {
      this.fetchInfo();
    }, 3000);
  }

  CustomerNavbar = () => {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#">Home</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link
              href={"/customer/" + this.props.match.params.id + "/search"}
            >
              Search
            </Nav.Link>
            <Nav.Link
              href={"/customer/" + this.props.match.params.id + "/status"}
            >
              Status
            </Nav.Link>
            <Link className="nav-link" to="/login" onClick={e => ls.clear()}>
              LogOut
            </Link>
          </Nav>
        </Navbar>
      </React.Fragment>
    );
  };

  handleEdit = (e, order, product) => {
    const count = parseInt(prompt("Quantity is "));
    if (isNaN(count)) return;
    if (
      count < 0 ||
      count > product["quantity"] - product["ordered"] + order["count"]
    ) {
      alert("Please Enter the correct quantity!");
    } else {
      axios
        .post("http://localhost:4000/customer/edit", {
          username: this.props.match.params.id,
          id: order._id,
          count: count
        })
        .then(response => {
          axios
            .post("http://localhost:4000/product/order", {
              id: product["_id"],
              order: count - order["count"],
              username: this.props.match.params.id
            })
            .then(res => {
              this.fetchInfo();
              this.setState({
                shows: "Order Edited Successfully!",
                showe: ""
              });
            })
            .catch(error => {
              this.setState({ showe: error.message, shows: "" });
            });
        })
        .catch(error => {
          this.setState({ showe: error.message, shows: "" });
        });
    }
  };

  handleRate = (e, username) => {
    const rate = parseInt(prompt("Rate the Vendor from 0 to 5: "));
    if (isNaN(rate)) return;
    if (rate < 0 || rate > 5) {
      alert("Please Enter the correct rating!");
    } else {
      axios
        .post("http://localhost:4000/vendor/rate", {
          username: username,
          rating: rate
        })
        .then(response => {
          this.setState({
            shows: "ThankYou For Rating",
            showe: ""
          });
        })
        .catch(error => {
          this.setState({ showe: error.message, shows: "" });
        });
    }
  };

  handleReview = (e, productName, vendorname) => {
    const rate = parseInt(prompt("Rate the Product from 0 to 5: "));
    if (isNaN(rate)) return;
    if (rate < 0 || rate > 5) {
      alert("Please Enter the correct rating!");
      return;
    }
    const review = prompt("Review: ");
    if (!review) review = "";
    axios
      .post("http://localhost:4000/review/edit", {
        username: this.props.match.params.id,
        vendorname: vendorname,
        productName: productName,
        rating: rate,
        review: review
      })
      .then(response => {
        this.setState({
          shows: "Thanks For Your Feedback",
          showe: ""
        });
      })
      .catch(error => {
        this.setState({ showe: error.message, shows: "" });
      });
  };

  CancelledTable = () => {
    let table = [];
    let body = [];
    let row = [];
    row.push(<th>{"Product Name"}</th>);
    row.push(<th>{"Vendor Name"}</th>);
    row.push(<th>{"Price"}</th>);
    row.push(<th>{"Order"}</th>);
    body.push(<tr>{row}</tr>);
    table.push(<thead>{body}</thead>);
    body = [];
    for (let i in this.state.orders) {
      let product = {};
      for (let j in this.state.product) {
        if (this.state.product[j]._id === this.state.orders[i].productId) {
          product = this.state.product[j];
          break;
        }
      }
      if (product["status"] !== "cancelled") continue;
      row = [];
      row.push(<td>{product["name"]}</td>);
      row.push(<td>{product["username"]}</td>);
      row.push(<td>{product["price"]}</td>);
      row.push(<td>{this.state.orders[i]["count"]}</td>);
      body.push(<tr>{row}</tr>);
    }
    table.push(<tbody>{body}</tbody>);
    return table;
  };

  WaitingTable = () => {
    let table = [];
    let body = [];
    let row = [];
    row.push(<th>{"Product Name"}</th>);
    row.push(<th>{"Vendor Name"}</th>);
    row.push(<th>{"Price"}</th>);
    row.push(<th>{"Ordered"}</th>);
    row.push(<th>{"Remaining"}</th>);
    row.push(<th>{"Edit"}</th>);
    body.push(<tr>{row}</tr>);
    table.push(<thead>{body}</thead>);
    body = [];
    for (let i in this.state.orders) {
      let product = {};
      for (let j in this.state.product) {
        if (this.state.product[j]._id === this.state.orders[i].productId) {
          product = this.state.product[j];
          break;
        }
      }
      if (product["status"] !== "waiting") continue;
      row = [];
      row.push(<td>{product["name"]}</td>);
      row.push(<td>{product["username"]}</td>);
      row.push(<td>{product["price"]}</td>);
      row.push(<td>{this.state.orders[i]["count"]}</td>);
      row.push(<td>{product["quantity"] - product["ordered"]}</td>);
      row.push(
        <td>
          <Button
            variant="warning"
            value={this.state.orders[i]["_id"]}
            onClick={e => this.handleEdit(e, this.state.orders[i], product)}
          >
            Edit
          </Button>
        </td>
      );
      body.push(<tr>{row}</tr>);
    }
    table.push(<tbody>{body}</tbody>);
    return table;
  };

  PlacedTable = () => {
    let table = [];
    let body = [];
    let row = [];
    row.push(<th>{"Product Name"}</th>);
    row.push(<th>{"Vendor Name"}</th>);
    row.push(<th>{"Price"}</th>);
    row.push(<th>{"Ordered"}</th>);
    row.push(<th>{"Edit"}</th>);
    row.push(<th>{"Rate"}</th>);
    body.push(<tr>{row}</tr>);
    table.push(<thead>{body}</thead>);
    body = [];
    for (let i in this.state.orders) {
      let product = {};
      for (let j in this.state.product) {
        if (this.state.product[j]._id === this.state.orders[i].productId) {
          product = this.state.product[j];
          break;
        }
      }
      if (product["status"] !== "placed") continue;
      row = [];
      row.push(<td>{product["name"]}</td>);
      row.push(<td>{product["username"]}</td>);
      row.push(<td>{product["price"]}</td>);
      row.push(<td>{this.state.orders[i]["count"]}</td>);
      row.push(
        <td>
          <Button
            variant="warning"
            value={this.state.orders[i]["_id"]}
            onClick={e => this.handleEdit(e, this.state.orders[i], product)}
          >
            Edit
          </Button>
        </td>
      );
      row.push(
        <td>
          <Button
            variant="info"
            value={product["_id"]}
            onClick={e => this.handleRate(e, product.username)}
          >
            Rate
          </Button>
        </td>
      );
      body.push(<tr>{row}</tr>);
    }
    table.push(<tbody>{body}</tbody>);
    return table;
  };

  DispatchedTable = () => {
    let table = [];
    let body = [];
    let row = [];
    row.push(<th>{"Product Name"}</th>);
    row.push(<th>{"Vendor Name"}</th>);
    row.push(<th>{"Price"}</th>);
    row.push(<th>{"Ordered"}</th>);
    row.push(<th>{"Review"}</th>);
    body.push(<tr>{row}</tr>);
    table.push(<thead>{body}</thead>);
    body = [];
    for (let i in this.state.orders) {
      let product = {};
      for (let j in this.state.product) {
        if (this.state.product[j]._id === this.state.orders[i].productId) {
          product = this.state.product[j];
          break;
        }
      }
      if (product["status"] !== "dispatched") continue;
      row = [];
      row.push(<td>{product["name"]}</td>);
      row.push(<td>{product["username"]}</td>);
      row.push(<td>{product["price"]}</td>);
      row.push(<td>{this.state.orders[i]["count"]}</td>);
      row.push(
        <td>
          <Button
            variant="info"
            value={this.state.orders[i]["_id"]}
            onClick={e => this.handleReview(e, product.name, product.username)}
          >
            Review
          </Button>
        </td>
      );
      body.push(<tr>{row}</tr>);
    }
    table.push(<tbody>{body}</tbody>);
    return table;
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
    return (
      <React.Fragment>
        <h4>{"Waiting Orders"}</h4>
        <Table striped bordered hover variant="dark">
          {this.WaitingTable()}
        </Table>{" "}
        <br />
        <h4>{"Placed Orders"}</h4>
        <Table striped bordered hover variant="dark">
          {this.PlacedTable()}
        </Table>
        <br />
        <h4>{"Dispatched Orders"}</h4>
        <Table striped bordered hover variant="dark">
          {this.DispatchedTable()}
        </Table>
        <br />
        <h4>{"Cancelled Orders"}</h4>
        <Table striped bordered hover variant="dark">
          {this.CancelledTable()}
        </Table>
      </React.Fragment>
    );
  };

  componentWillMount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <React.Fragment>
        {ls.get("username") === this.props.match.params.id &&
          ls.get("userType") === "customer" && (
            <React.Fragment>
              <this.CustomerNavbar />
              <br />
              <this.HandleAlert />
              <this.View />
            </React.Fragment>
          )}
      </React.Fragment>
    );
  }
}
