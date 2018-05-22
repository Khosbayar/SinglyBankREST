const Customer = require('../model/customer');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const serverJWT_Secret = 'kpTxN=)7mX3W3SEJ58Ubt8-';

const algorithm = 'aes-256-ctr';
const password = 'aSjlkvS89';

function encrypt(text) {
    var cipher = crypto.createCipher(algorithm, password);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

exports.cust_list = function (req, res, next) {
    Customer.find()
        .sort([['cust_no', 'ascending']])
        .exec(function (err, custs) {
            if (err) return next(err);
            res.send(JSON.stringify(custs));
        });
}

exports.cust_detail = function (req, res, next) {
    Customer.findOne({ cust_no: req.params.id }, function (err, cust) {
        if (err) return next(err);
        res.send(JSON.stringify(cust));
    });
}

exports.login = function (req, res, next) {
    console.log(req.body.username);
    console.log(req.body.password);
    if (req.body && req.body.username && req.body.password) {
        const reqUsername = req.body.username;
        var reqPassword = req.body.password;
        let user;
        console.log("hashing password:" + reqPassword);
        reqPassword = encrypt(reqPassword);
        console.log("hashing finished:" + reqPassword);
        Customer.findOne({ username: reqUsername, password: reqPassword }, function (err, cust) {
            if (err) next(err);
            if (cust) {
                const token = jwt.sign(JSON.stringify(cust), serverJWT_Secret);
                res.status(200).send({
                    user: JSON.stringify(cust),
                    token: token
                });
            } else {
                res.status(403).send({
                    errorMessage: 'Username or password is wrong, maybe both...'
                });
            }
        });

    } else {
        res.status(403).send({
            errorMessage: 'Please provide email and password'
        });
    }
}

exports.update_cust = function (req, res, next) {
    Customer.findOneAndUpdate({ cust_no: req.params.id }, req.body, { new: true }, function (err, cust) {
        if (err) return next(err);
        res.send(JSON.stringify(cust));
    });
}

exports.create_cust = function (req, res, next) {
    console.dir(req.body);
    var cust = new Customer({
        cust_no: req.body.cust_no,
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        ssn: req.body.ssn,
        username: req.body.username,
        password: req.body.password,
        date_of_birth: req.body.date_of_birth,
        contact_phone: req.body.contact_phone,
        email_address: req.body.email_address,
        sex: req.body.sex,
        address: { zip: req.body.address.zip, state: req.body.address.state, city: req.body.address.city, street: req.body.address.street, no: req.body.address.no }
    });

    cust.save().then(function () {
        // res.redirect('/users');
        res.send("Successful ");
    }).catch(function (err) {
        if (err) return next(err);
    });
}