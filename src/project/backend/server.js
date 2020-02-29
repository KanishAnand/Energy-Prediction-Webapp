const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let User = require('./models/user');
let Product = require('./models/product');

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints
userRoutes.route("/prdct").post(function(req, res) {
    console.log(req.body)
	date = req.body.date;
	time = req.body.time;
    // console.log(date)
  
	const { spawn } = require("child_process");
	const pyProg = spawn("python", ["./model.py", date, time]);
    // console.log(pyProg)
	pyProg.stdout.on("data", function(data) {
		console.log(data.toString());
		res.end(data.toString());
		// res.end("end");
	});
});
// Getting all the users
userRoutes.route('/list').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

// Adding a new user
userRoutes.route('/add').post(function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'User': 'User added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

//Authentication in login
userRoutes.route('/login').post(function(req, res) {
    User.findOne({username: `${req.body.username}`, password: `${req.body.password}`, user_type: `${req.body.user_type}`}, function(err, name) {
        return res.json(name);
    })
});

userRoutes.route('/search').post(function(req, res) {
    Product.find({productname: `${req.body.searchname}`}, function(err, name) {
        return res.json(name);
    })
});

userRoutes.route('/listproducts').post(function(req, res) {
    // console.log(req.b)
    Product.find({vendor_id: `${req.body.vendor_id}`}, function(err, name) {
        return res.json(name);
    })
});

userRoutes.route('/deleteproduct').post(function(req, res) {
    console.log(req.body)
    Product.deleteOne({_id: `${req.body.product_id}`}, function(err, name) {
        return res.json(name);
    })
});
// Adding a new product
userRoutes.route('/add1').post(function(req, res) {
    let product = new Product(req.body);
    console.log(req.body)
    product.save()
        .then(product => {
            res.status(200).json({'Product': 'Product added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});
// Getting a user by id
userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
