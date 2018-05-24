const Account = require('../model/account');

exports.acct_list = function(req, res, next){
    Account.find()
        .sort([['acct_no', 'ascending']])
        .exec(function(err, accts){
            if(err) return next(err);
            res.send(JSON.stringify(accts));
        });
}

exports.cust_acct_list = function(req,res,next){
    Account.find({'cust_no':req.params.id})
        .sort([['acct_no', 'ascending']])
        .exec(function(err, accts){
            if(err) return next(err);
            res.send(JSON.stringify(accts));
        });
}

exports.acct_detail = function(req,res,next){
    Account.findOne({acct_no:req.params.id},function(err,acct){
        if(err) return  next(err);
        res.send(JSON.stringify(acct));
    });
}

exports.update_acct = function(req,res,next){
    Account.findOneAndUpdate({acct_no:req.params.id},req.body, {new : true}, function(err,acct){
        if(err) return  next(err);
        res.send(JSON.stringify(acct));
    });
}

exports.create_acct = function(req,res,next){
    var acct = new Account({
        acct_no: req.body.acct_no,
        cust_no: req.body.cust_no,
        acct_name: req.body.acct_name,
        current_bal: req.body.current_bal,
        begin_bal: req.body.begin_bal,
        acct_type: req.body.acct_type,
        acct_status: req.body.acct_status,
        bank_account: req.body.bank_account,
        interest_rate: req.body.interest_rate,
        saving_book_fee:req.body.saving_book_fee,
        saving_maturity: req.body.saving_maturity,
        maintenance_fee: req.body.maintenance_fee,    
        opened_date: new Date()
    });

    acct.save().then(function(){
        res.status(200).send({
            tran_msg: "Account successfull!"
        });
    }).catch(function(err){
        if(err) return next(err);
    });
}