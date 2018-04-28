const express = require('express');
const fs = require('fs');
const port = process.env.PORT || 3000; // This port value comes from the prt value heroku has set up.

var app = express();
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use((req, res, next) =>{
  var now = new Date().toString();
  var log = now + ',' + req.method + ',' + req.url ;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>{
         if(err)
         {console.log(err);}
  });
  next();
});
//app.use((req,res,next)=>{
//  res.render('maintainance.hbs');
//});
app.use(express.static(__dirname + '/public')); //middleware

hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>
{
  return text.toUpperCase();
});
app.get('/',(req,res)=>{
//  res.send('<h1>hello</h1>');
//     res.send(
//       {
//       name : 'Shreyansh',
//       hobby : [ 'cricket',
//       'biking']
//       }
//     );
//
res.render('home.hbs',{
  pageTitle : 'Home Page',
  pageContent : 'Welcome to home page'
});
 });
 app.get('/project',(req,res)=>{
   res.render('project.hbs',{
     pageTitle : 'Project page',
     pageContent : 'I have completed two projects'
   });
 });
app.get('/about',(req,res)=>{
  res.render('about.hbs', {
    pageTitle : 'About Page'
  });
});
app.listen(port , () => {
  console.log('Server is up on port' + port);
});
