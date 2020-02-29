import React, {Component} from 'react';
import axios from 'axios';

export default class ProductsList extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            vendor_id: this.props.location.id,
            vendorname: this.props.location.name,
            products: []
        }
        console.log(this.state.vendor_id)
    }
   

    componentDidMount() {
        const product = {
            vendor_id: this.state.vendor_id
        }
        console.log(product)
        axios.post('http://localhost:4000/listproducts', product)
            .then(response => {
                this.setState({products: response.data});
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    add = (e) => {
        this.props.history.push({
            pathname: '/addproduct',
            id: this.state.vendor_id,
            name: this.state.vendorname
        })
    }

    listpro = (e) => {
        this.props.history.push({
            pathname: '/listproducts/:id',
            id: this.state.vendor_id,
            name: this.state.vendorname
        })
    }
    
    logout = (e) => {
        this.props.history.push({
            pathname: '/login',
        })
    }

    delete = (e,x) => {
        console.log(x)
            const prodid = {
                product_id: x
            }
            // console.log(product)
            axios.post('http://localhost:4000/deleteproduct', prodid)
                .then(response => {
                    const product = {
                        vendor_id: this.state.vendor_id
                    }
                    console.log(product)
                    axios.post('http://localhost:4000/listproducts', product)
                        .then(response => {
                            this.setState({products: response.data});
                        })
                        .catch(function(error) {
                            console.log(error);
                        })
                    this.props.history.push({
                        pathname: '/listproducts/:id',
                        id: this.state.vendor_id,
                        name: this.state.vendorname
                    })   

                })
                .catch(function(error) {
                    console.log(error);
                })
        }
    

    render() {
        return (
            <div>
                <button onClick = {e => this.add(e)}>ADD NEW PRODUCT</button>
                <button onClick = {e => this.listpro(e)}>LIST ALL PRODUCTS</button>
                <button>PLACED</button>
                <button>DISPATCHED PRODUCT</button>
                <button onClick = {e => this.logout(e)}>LOGOUT</button>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product-Name</th>
                            <th>Quantity</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.products.map((currentProduct, i) => {
                            return (
                                <tr>
                                    <td>{currentProduct.productname}</td>
                                    <td>{currentProduct.quantity}</td>
                                    <td>{currentProduct.rate}</td>
                                    <button onClick = {e => this.delete(e,currentProduct._id)}>DELETE</button>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}