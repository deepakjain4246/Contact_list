const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact=require('./models/contact');
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());


var contactList = [
     {
          name: "Arphan",
          phone: "1111111"
     },
     {    
          name:"Deepak",
          phone: "123456"
     }
]
app.get('/', function (req, res) {
     return res.render('home', {
          title: "Contact list",
          contact_list: contactList
     });
});
// app.post('/create_contact', function (req, res) {
//      // console.log("hi")
//      // return res.redirect('/practice.ejs');
//      contactList.push({
//           name:req.body.name,
//           phone:req.body.phone
//      })
//     // contactList.push(req.body);
//      return res.redirect('back');
// });

//populating the database
app.post('/create_contact',function(req,res){
     Contact.create({
          name:req.body.name,
          phone:req.body.phone
     }),function(err,newContact){
          if(err){
               console.log('Error in creating a contact');
               return;
          }
          console.log('*************',newContact);
          return res.redirect('back');
     }
});

//fetching data from Db
app.get('/',function(req,res){
     Contact.find({},function(err,contacts){
          if(err){
               console.log('Error in fetching contact from DB');
               return;
          }
          return res.render('home',{
               title:"ContactList",
               contact_list:contacts
          })
     })
});

//deleting contact
app.get('/delete_contact',function(req,res){
   let phone=req.query.phone;
   let contactIndex=contactList.findIndex(contact=>
     contact.phone==phone                          
     );
     if(contactIndex != -1){
          contactList.splice(contactList,1);
     }
     return res.redirect('back');
});







app.get("/practice", (req, res) => {
     return res.render("practice", {
          title: "practice"
     });
})
app.listen(port, function (err) {
     if (err) {
          console.log('Error in running the server', err);
     }
     console.log('Server is up nd running!' + port)
});
