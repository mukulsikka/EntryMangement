const express = require('express');
const checks = require('../helpers/sanity_checks');
const utils = require('util');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const triggers = require('../helpers/trigger')


mongoose.connect('mongodb://127.0.0.1:27017/visit',{ useNewUrlParser: true });

const router = express.Router();
const GroupModel = mongoose.model('visit', Schema({
    visitorname: String,
    visitorphnno: Number,
    visitoremail:String,
    hostname:String,
    hostphnno: Number,
    hostemail:String,
    email: Boolean,
    checkintime:Date,
    checkouttime:Date
}));


module.exports.entry = async (req,res)=>{
    const VisitorName = req.body.body.visitorname;
    const VisitorPhoneno = req.body.body.visitorphoneno;
    const Visitoremail = req.body.body.visitoremail;
    const Hostname = req.body.body.hostname;
    const HostPhoneno = req.body.body.hostphoneno;
    const Hostemail = req.body.body.hostemail;
    const time = Date.now();
    const dataToVerify = { VisitorName, VisitorPhoneno, Visitoremail, Hostname, HostPhoneno, Hostemail};
    const status = await checks.is_blank(dataToVerify);
    if(status.is_blank) {
        res.status(200);
        res.send({'message':utils.format(errors.blank_variable, status.attribute)});
    }
    
    const group= new GroupModel({
        visitorname: VisitorName,
        visitorphnno: VisitorPhoneno,
        visitoremail:Visitoremail,
        hostname:Hostname,
        hostphnno: HostPhoneno,
        hostemail:Hostemail,
        sms: false,
        checkintime:time
    });
    let result = await group.save()
    let id = result._id
    console.log(id)
    await triggers.visit('company@company.com',Hostemail,VisitorName,Visitoremail,visitorphoneno)
    await triggers.entrymessage(HostPhoneno,VisitorName,Visitoremail,visitorphoneno)
    res.status(200);
    res.send({'message': id});
}

module.exports.exit = async (req,res)=>{
    const Visitorid = req.body.body.id;
    const time = Date.now();
    const filter = { _id: Visitorid };
    const update = {checkouttime:time}
    let doc = await GroupModel.findOneAndUpdate(filter, update);
    await triggers.exit('company@company.com',doc.visitoremail,doc.visitorname,doc.visitorphnno,doc.checkintime,doc.checkouttime,doc.hostname)
    res.status(200);
    res.send({'message': "successfully executed"});
}



