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
  Navbar,
  Nav,
  Alert,
  ControlLabel
} from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object({
  username: yup.string().required(),
  name: yup
    .string()
    .required("Please Enter a Product Name")
    .min(4, "Too Short!")
    .max(64, "Too Long!"),
  price: yup
    .number()
    .min(0)
    .required("Please Enter the Price"),
  quantity: yup
    .number()
    .required("Please Enter the Quantity")
    .min(1)
});

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
              href={"vendor/" + this.props.match.params.id + "/dispatched"}
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

  Add = () => {
    return (
      <Formik
        validationSchema={schema}
        initialValues={{
          username: this.props.match.params.id,
          name: "",
          price: "",
          quantity: 1
        }}
        onSubmit={(values, actions) => {
          axios
            .post("http://localhost:4000/product/add", values)
            .then(res => {
              actions.resetForm();
              this.setState({
                shows: "Product Added Successfully!",
                showe: ""
              });
            })
            .catch(err => {
              this.setState({ showe: err.message, shows: "" });
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group md="6" controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Name"
                aria-describedby="inputGroupPrepend"
                name="name"
                value={values.name}
                onChange={handleChange}
                isInvalid={(touched.name || values.name) && errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group md="6" controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Price"
                name="price"
                value={values.price}
                onChange={handleChange}
                isInvalid={(touched.price || values.price) && errors.price}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group md="6" controlId="productQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                placeholder="Quantity"
                name="quantity"
                value={values.quantity}
                onChange={handleChange}
                isInvalid={
                  (touched.quantity || values.quantity) && errors.quantity
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.quantity}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    );
  };

  render() {
    return (
      <React.Fragment>
        {ls.get("username") === this.props.match.params.id &&
          ls.get("userType") === "vendor" && (
            <React.Fragment>
              <this.VendorNavbar />
              <br />
              <this.HandleAlert />
              <this.Add />
            </React.Fragment>
          )}
      </React.Fragment>
    );
  }
}
