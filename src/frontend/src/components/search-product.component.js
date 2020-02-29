import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            searchname: '',
            sortby: 'Price',
            customer_id: this.props.location.id,
            customername: this.props.location.name,
            result: []
        }
        this.onChangeSearchname = this.onChangeSearchname.bind(this);
        this.onChangeSortby = this.onChangeSortby.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeSearchname(event) {
        this.setState({ searchname: event.target.value });
    }

    onChangeSortby(event) {
        this.setState({ sortby: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        // console.log(this.state.user_type)

        const newUser = {
            searchname: this.state.searchname,
            sortby: this.state.sortby
        }

        axios.post('http://localhost:4000/search', newUser)
        .then(response => {
            if(newUser.sortby === 'Price'){
                console.log('hihiii')
                this.setState({result: response.data.sort((a,b) => a.rate - b.rate)});
            }
            else if(newUser.sortby === 'Quantity'){
                this.setState({result: response.data.sort((a,b) => a.quantity - b.quantity)});
            }
        })
        .catch(function(error) {
            console.log(error);
        })

        this.setState({
            searchname: '',
            sortby: '',
        });
    }

    search = (e) => {
        this.props.history.push({
            pathname: '/searchproduct/:id',
            id: this.state.customer_id,
            name: this.state.customername
        })
    }

    logout = (e) => {
        this.props.history.push({
            pathname: '/login',
        })
    }

    render() {
        return (
            <div>
                <button>SEARCH</button>
                <button>STATUS</button>
                <button onClick = {e => this.logout(e)}>LOGOUT</button>
                
                <br/>
                <br/>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Search Product: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.searchname}
                               onChange={this.onChangeSearchname}
                               />
                    </div>

                    <div className="form-group">
                        <label>User Type: </label>
                        <select 
                                className="form-control" 
                                value={this.state.sortby}
                                onChange={this.onChangeSortby}>
                            <option value="Price">Price</option>
                            <option value="Quantity">Quantity</option>
                        </select> 
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" value="Find" className="btn btn-primary"/>
                    </div>
                </form>

                <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Vendor name</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.result.map((currentUser, i) => {
                            return (
                                <tr>
                                    <td>{currentUser.productname}</td>
                                    <td>{currentUser.quantity}</td>
                                    <td>{currentUser.rate}</td>
                                    <td>{currentUser.vendorname}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
            </div>
        )
    }
}