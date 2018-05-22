const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const TranSchema = new Schema({
    from_acct_no: { type: Number, required: true, index: true },
    to_acct_no: { type: Number, required: true, index: true },
    amount: { type: Number, required:true },
    start_bal: { type: Number},
    end_bal: { type: Number},
    description: String,
    tran_type: String,
    tran_date: Date
});

TranSchema.index({from_acct_no:1,to_acct_no:1,tran_date:-1});

module.exports = mongoose.model('Transaction', TranSchema);


