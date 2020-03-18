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
  Table,
  Navbar,
  Nav,
  Alert,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  ControlLabel
} from "react-bootstrap";

export default class SearchProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      vendor: [],
      search: "",
      sort: "",
      asc: 1,
      shows: "",
      showe: ""
    };
  }

  fetchInfo = () => {
    axios
      .post("http://localhost:4000/product/search", {
        name: this.state.search
      })
      .then(response => {
        response.data = response.data.filter(row => row.status === "waiting");
        axios
          .get("http://localhost:4000/vendor/")
          .then(res => {
            this.setState({ product: response.data, vendor: res.data });
            this.handleSort(this.state.sort, this.state.asc);
          })
          .catch(function(error) {
            console.log(error.message);
          });
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

  handleClick = (e, id, quantity) => {
    const count = parseInt(prompt("Quantity is "));
    if (isNaN(count)) return;
    if (count <= 0 || count > quantity) {
      alert("Please Enter the correct quantity!");
    } else {
      axios
        .post("http://localhost:4000/customer/order", {
          username: this.props.match.params.id,
          productId: id,
          count: count
        })
        .then(response => {
          axios
            .post("http://localhost:4000/product/order", {
              id: id,
              order: count,
              username: this.props.match.params.id
            })
            .then(res => {
              this.fetchInfo();
              this.setState({
                shows: "Order Placed Successfully!",
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
        <br />
        <Navbar bg="light" expand="lg">
          <InputGroup size="lg" className="mb-3">
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-2"
              onChange={e => {
                this.handleSearch(e);
              }}
            />
            <Button
              variant="outline-success"
              className="mr-2"
              onClick={e => {
                this.handleSubmit(e);
              }}
            >
              Search
            </Button>
            <DropdownButton
              id="sort"
              title="Sort By"
              size="lg"
              variant="info"
              onSelect={e => this.handleSort(e, this.state.asc)}
            >
              <Dropdown.Item eventKey="quantity">Quantity</Dropdown.Item>
              <Dropdown.Item eventKey="price">Price</Dropdown.Item>
              <Dropdown.Item eventKey="rating">Rating</Dropdown.Item>
            </DropdownButton>
            <Dropdown
              as={ButtonGroup}
              onSelect={e =>
                this.handleSort(this.handleSort(this.state.sort, parseInt(e)))
              }
            >
              <Dropdown.Toggle split variant="info" id="asc" />
              <Dropdown.Menu>
                <Dropdown.Item eventKey="1">ASC</Dropdown.Item>
                <Dropdown.Item eventKey="-1">DESC</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </InputGroup>
        </Navbar>
      </React.Fragment>
    );
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
    row.push(<th>{"Product Name"}</th>);
    row.push(<th>{"Vendor Name"}</th>);
    row.push(<th>{"Price"}</th>);
    row.push(<th>{"Quantity"}</th>);
    row.push(<th>{"Rating"}</th>);
    row.push(<th>{"Order"}</th>);
    body.push(<tr>{row}</tr>);
    table.push(<thead>{body}</thead>);
    body = [];
    for (let i in this.state.product) {
      let vendor = { rating: 1 };
      for (let j in this.state.vendor) {
        if (this.state.vendor[j].username === this.state.product[i].username) {
          vendor = this.state.vendor[j];
          break;
        }
      }
      row = [];
      row.push(<td>{this.state.product[i]["name"]}</td>);
      row.push(
        <td>
          <a
            href={"/vendor/" + this.state.product[i]["username"] + "/review"}
            style={{ color: "#FFF" }}
            target="_blank"
          >
            {this.state.product[i]["username"]}
          </a>
        </td>
      );
      row.push(<td>{this.state.product[i]["price"]}</td>);
      row.push(
        <td>
          {this.state.product[i]["quantity"] - this.state.product[i]["ordered"]}
        </td>
      );
      row.push(<td>{vendor["rating"]}</td>);
      row.push(
        <td>
          <Button
            variant="success"
            value={this.state.product[i]["_id"]}
            onClick={e =>
              this.handleClick(
                e,
                this.state.product[i]["_id"],
                this.state.product[i]["quantity"] -
                  this.state.product[i]["ordered"]
              )
            }
          >
            Order
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

  handleSearch = e => {
    this.setState({ search: e.target.value });
  };

  handleSubmit = e => {
    this.fetchInfo();
  };

  handleSort = (e, asc) => {
    if (e === "" || e === undefined) return;
    if (e === "quantity")
      this.setState({
        product: this.state.product.sort((a, b) =>
          a[e] - a["ordered"] > b[e] - b["ordered"]
            ? asc
            : b[e] - b["ordered"] > a[e] - a["ordered"]
            ? -asc
            : 0
        ),
        sort: e,
        asc: asc
      });
    else if (e === "rating") {
      this.setState({
        product: this.state.product.sort((a, b) => {
          let arating = 1;
          let brating = 1;
          for (let j in this.state.vendor) {
            if (this.state.vendor[j].username === a.username)
              arating = this.state.vendor[j].rating;
            if (this.state.vendor[j].username === b.username)
              brating = this.state.vendor[j].rating;
          }
          return arating > brating ? asc : brating > arating ? -asc : 0;
        }),
        sort: e,
        asc: asc
      });
    } else {
      this.setState({
        product: this.state.product.sort((a, b) =>
          a[e] > b[e] ? asc : b[e] > a[e] ? -asc : 0
        ),
        sort: e,
        asc: asc
      });
    }
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
