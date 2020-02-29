import React, {Component} from 'react';
import axios from 'axios';

export default class VendorUser extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            vendor_id: this.props.location.id,
            vendorname: this.props.location.name
        }

    }    

    add = (e) => {
        this.props.history.push({
            pathname: '/addproduct/:id',
            id: this.state.vendor_id,
            name: this.state.vendorname
        })
    }
    
    logout = (e) => {
        this.props.history.push({
            pathname: '/login',
        })
    }

    listpro = (e) => {
        this.props.history.push({
            pathname: '/listproducts/:id',
            id: this.state.vendor_id,
            name: this.state.vendorname
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

            </div>
        )
    }
}