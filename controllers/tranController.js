const Transaction = require('../model/transaction');

exports.tran_list = function(req,res,next){
    Transaction.find()
        .sort([['tran_date', 'descending']])
        .exec(function(err, accts){
            if(err) return next(err);
            res.send(JSON.stringify(accts));
        });
}

exports.make_tran = function(req,res,next){
    var tran = new Transaction({
        from_acct_no: req.body.from_acct_no,
        to_acct_no: req.body.to_acct_no,
        amount: req.body.amount,
        start_bal: req.body.start_bal,
        end_bal: req.body.end_bal,
        description: req.body.description,
        tran_type: req.body.tran_type,
        created_date: new Date()
    });

    tran.save().then(function(){
        res.send("Transaction successfull");
    }).catch(function(err){
        if(err) return next(err);
    });
}