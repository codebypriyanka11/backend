var express = require('express');
var router = express.Router();
// hamne users.js file se user model ko import kiya hai
const userModel = require('./users');

/* GET home page. */
router.get('/', function(req, res, next) {
 
  // yah humne session me ek variable banaya hai jiska naam ban hai or uski value true hai
  // ya phale likhna hai ki agar user ko ban karna hai to uski value true ho or agar user ko allow karna hai to uski value false ho
  req.session.ban = true;

// yah humne cookie me ek variable banaya hai jiska naam age hai or uski value 22 hai
res.cookie("age",22);

   res.render('index', { title: 'Express' });
});
// yah humne ek route banaya hai jisme humne user create karne ka code likha hai
router.get("/create",async function(req,res){
 const createduser = await userModel.create({
    username:"priyanka",
    name:"priyanka",
    age:22
  })
  res.send(createduser);
});

// yah humne ek route banaya hai jisme humne user ko find karne ka code likha hai or output ak array me milega
router.get ("/allusers",async function(req,res){
  const allusers = await userModel.find();
  res.send(allusers);
});

// yah humne ek route banaya hai jisme humne user ko find karne ka code likha hai or output ak object me milega
router.get ("/oneuser",async function(req,res){
  const oneuser = await userModel.findOne({username:"priyanka" });
  res.send(oneuser);
});

// yah humne ek route banaya hai jisme humne user ko delete karne ka code likha hai or output ak object me milega
router.get ("/delete",async function(req,res){
  const deleteuser = await userModel.findOneAndDelete({username:"priyanka" });
  res.send(deleteuser);
});

router.get("/checkban",function(req,res){
  // yah humne ek route banaya hai jisme humne session me ban variable ko check kiya hai agar uski value true hai to user ko banned message milega or agar false hai to user ko allowed message milega

// console.log(req.session);
// res.send("check kiya hai console me dekho");

if(req.session.ban === true){
  res.send("user is banned");
}
else{
  res.send("user is allowed");
}
})

router.get("/removeban",function(req,res){
  req.session.destroy(function(err){
    // console.log(err);
    if(err) throw err;
    res.send("ban removed");
  })
})

// yah humne ek route banaya hai jisme humne cookie ko read kiya hai or uski value console me print kiya hai
router.get("/read",function(req,res){
  console.log(req.cookies.age);
  res.send("cookie read kiya hai console me dekho");
});

// yah humne ek route banaya hai jisme humne cookie ko delete kiya hai
router.get("/deletecookie",function(req,res){
  res.clearCookie("age");
  res.send("cookie delete kiya hai");
});
module.exports = router;
