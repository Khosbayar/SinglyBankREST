const Transaction = require('../model/transaction');
const Account = require('../model/account');

exports.tran_list = function (req, res, next) {
    Transaction.find()
        .sort([['tran_date', 'descending']])
        .exec(function (err, accts) {
            if (err) return next(err);
            res.send(JSON.stringify(accts));
        });
}

exports.make_tran = function (req, res, next) {
    Account.findOne({ acct_no: req.body.from_acct_no }, function (err, acct) {
        if (err) return next(err);
        // console.log(acct._doc.current_bal);
        let from_acct_no_bal = acct._doc.current_bal;
        if (from_acct_no_bal > req.body.amount) {
            Account.findOneAndUpdate({ acct_no: req.body.from_acct_no }, { "$inc": { "current_bal": -req.body.amount } }, function (err, acct) {
                if (err) return next(err);
                Account.findOneAndUpdate({ acct_no: req.body.to_acct_no }, { "$inc": { "current_bal": req.body.amount } }, function (err, acct) {
                    if (err) return next(err);
                    var tran = new Transaction({
                        from_acct_no: req.body.from_acct_no,
                        to_acct_no: req.body.to_acct_no,
                        amount: req.body.amount,
                        start_bal: req.body.start_bal,
                        end_bal: req.body.end_bal,
                        description: req.body.description,
                        tran_type: req.body.tran_type,
                        tran_date: new Date()
                    });
                    tran.save().then(function () {
                        res.status(200).send({
                            tran_msg: "Transaction successfull!"
                        })
                    }).catch(function (err) {
                        if (err) return next(err);
                    });
                });
            });
        }
        else {
            res.status(200).send({
                tran_msg: "Insufficient balance!"
            })
        }
    });


}