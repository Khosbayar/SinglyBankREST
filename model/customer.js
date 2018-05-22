const mongoose = require('mongoose');
const moment = require('moment');
const crypto = require('crypto');

const Schema = mongoose.Schema;

const CustSchema = new Schema({
    cust_no: { type: Number, required: true, index: true },
    first_name: { type: String, required: true, max: 100 },
    middle_name: { type: String, max: 100 },
    last_name: { type: String, required: true, max: 100 },
    ssn: {type:String,  required:true},
    username: { type: String, required: true },
    password: { type: String, required: true},
    date_of_birth: { type: Date },
    contact_phone: {type: Number},
    email_address: {type: String},
    sex: {type: Boolean},
    address: { zip: String, state: String, city: String, street: String, no: String },
    last_updated: Date,
    created_date: Date
});

CustSchema.index({cust_no:1});

CustSchema
    .virtual('date_of_birth_formatted')
    .get(function () {
        return moment(this.date_of_birth).utc().format('YYYY-MM-DD');
    });

const algorithm = 'aes-256-ctr';
const password = 'aSjlkvS89';

function encrypt(text) {
    var cipher = crypto.createCipher(algorithm, password);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

CustSchema.pre('save', function (next) {
    var pwd = this.password;
    console.log("hashing password: " + pwd);
    this.password = encrypt(pwd);
    next();
});

module.exports = mongoose.model('Customer', CustSchema);