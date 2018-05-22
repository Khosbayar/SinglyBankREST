const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const AcctSchema = new Schema({
    acct_no: { type: Number, required: true, index: true },
    cust_no: { type:Number, required: true, index:true},
    acct_name: { type: String, max: 100 },
    current_bal: { type: Number, default: 0 },
    begin_bal: { type: Number },
    acct_type: String,
    acct_status: String,
    bank_account: Boolean,
    interest_rate: Number,
    saving_book_fee:Number,
    saving_maturity: Number,
    maintenance_fee: Number,    
    last_updated: Date,
    opened_date: Date
});

AcctSchema.index({acct_no:1,cust_no:1});

module.exports = mongoose.model('Account', AcctSchema);