const sgMail = require('@sendgrid/mail');
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: process.env.apiKey,
  apiSecret: process.env.apiSecret
});

const from = 'Happy Visit';

module.exports.entrymessage=async(HostPhoneno,VisitorName,Visitoremail,visitorphoneno)=>{
  const text = ('A person keen to meet you for some work has arrived and is willing to be hosted His Dteails are given below: Name:',VisitorName,'email:',Visitoremail,'Phone:',visitorphoneno);
  const to = HostPhoneno;
await nexmo.message.sendSms(from, to, text,function(err,res){
   if(err){
     console.log(err)
   }
   else{
     console.log(res)
   }
 });
 console.log("happy")
}

module.exports.visit=async (emailfrom,emailto,visitorname,visitoremail,visitorphn)=> {
sgMail.setApiKey(pocess.env.sgkey);
const msg = {
  to: emailto,
  from: emailfrom,
  subject: 'A Guest at your door',
  html: ('<p>A person keen to meet you for some work has arrived and is willing to be hosted His Dteails are given below:<p/><br><p>Name:<p/>',visitorname,'<br><p>email:<p/>',visitoremail,'<br><p>Phone:<p/>',visitorphn),                               
};
sgMail.send(msg);
}

module.exports.exit=async (emailfrom,emailto,visitorname,visitorphnno,checkintime,checkoutime,hostname)=> {
  sgMail.setApiKey(pocess.env.sgkey);
  const msg = {
    to: emailto,
    from: emailfrom,
    subject: 'Thanks for your visit',
    html: ('Your meeting is over as a record we are sending you, your meeting details<p/><br><p>Name:<p/>',visitorname,'<br><p>Phone:<p/>',visitorphnno,'<br><p>check-in-time:<p/>',checkintime,'<br><p>check-out-time:<p/>',checkoutime,'<br><p>Host name:<p/>',hostname),                               
  };
  sgMail.send(msg);
}