import React, {Component} from 'react';
import axios from 'axios';

export default class VendorUser extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            customer_id: this.props.location.id,
            customername: this.props.location.name
        }

    }    

    search = (e) => {
        this.props.history.push({
            pathname: '/list',
            id: this.state.customer_id,
            name: this.state.customername
        })
    }
    
    submit = (e) => {
        const d = document.getElementById('start').value
        const t = document.getElementById('start1').value
        console.log(d)
        console.log(t)
        const  data = {
            date : d,
            time : t
        }
        axios.post('http://localhost:4000/prdct',data)
        .then(res => {
            alert(res.data);
        }
        )
        .catch(err => console.log(err))
        
       
    }

    logout = (e) => {
        this.props.history.push({
            pathname: '/login',
        })
    }

    render() {
        return (
            <div>
                <button onClick = {e => this.search(e)}>Show Users</button>
                <button onClick = {e => this.logout(e)}>Logout</button>

                <br></br>
                <br></br>

                <label for="start">From:</label>
                <input type="Date" id="start" name="start"
                min="2020-03-04"></input><br></br>


                <label for="start1">From Time:</label>
                <input type="number" id="start1" name="start1"
                min="0" max="23"></input><br></br>

                <label for="end">To:</label>
                <input type="Date" id="end" name="end"
                min="2020-03-04" max="2020-03-20"></input><br></br>

                <label for="end1">From Time:</label>
                <input type="number" id="end1" name="end1"
                min="0" max="23"></input><br></br>

                <button onClick = {e => this.submit(e)}>Submit</button>
            </div>
        )
    }
}