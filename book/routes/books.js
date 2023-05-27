var express = require('express');
var pool=require('./pool')
var upload=require('./multer')
var router = express.Router();


/* GET use to show book interface. */
router.get('/bookinterface', function(req, res, next) {
  res.render('bookinterface',{status:-1,message:''})
  
})
router.get('/fetch_all_subjects',function(req,res){
pool.query("select * from subjects",function(error,result){
if(error)
{res.status(500).json([])}
else
{res.status(200).json(result)}

})


})

router.get('/fetch_all_title',function(req,res){
  pool.query("select * from booktitle where subjectid=?",[req.query.subjectid],function(error,result){
  if(error)
  {res.status(500).json([])}
  else
  {res.status(200).json(result)}
  
  })
  
  
  })
  
router.post('/submit_book_details',upload.single('poster'),function(req,res){
 console.log("BODY:",req.body)
 console.log("FILE:",req.file)

 pool.query("insert into bookdetails (subjectid,titleid,author,publisher,price,offer,status,poster)values(?,?,?,?,?,?,?,?)",[req.body.subjectid,req.body.titleid,req.body.author,req.body.publisher,req.body.price,req.body.offer,req.body.status,req.file.originalname],function(error,result){
  if(error)
  { console.log(error)
    res.render('bookinterface',{status:0,message:'Server Error...'})
  }
  else
  {

    res.render('bookinterface',{status:1,message:'Record Submitted Successfully....'})
  }

 })



})


router.get('/fetch_all_books',function(req,res){
  pool.query("select BD.*,(select BS.foodname from food_type BS where BS.foodid=BD.foodid) as foodname, (select BT.food name from booktitle BT where BT.titleid=BD.titleid) as title   from bookdetails BD",function(error,result){
  if(error)
  {res.render('displayallbooks',{data:[]})}
  else
  { console.log(result)
    res.render('displayallbooks',{data:result})

  }
  
  })
  })




module.exports = router;
