//define express so we can use in program
const express = require('express')
const app = express()
const path = require("path")
const hbs = require("hbs")
const collection = require("./mongodb")
const bcrypt = require("bcrypt")

//define the path
const viewPath = path.join(__dirname,'../views')

//get the hbs and mongodb files successfully connected
app.use(express.json())
app.set("view engine", "hbs")
//setting the paths
app.set("views", viewPath)
//help us to get MongoDB data
app.use(express.urlencoded({extended:false}))


//links the styling sheets to each page
app.use(express.static('public'))

//get the login page -> / means default so login is the default page
app.get("/", (req, res) => {
    res.render("login")
})

//get the signup page
app.get("/signup", (req, res) => {
    res.render("signup")
})







//submitting our information into database for signup
app.post("/signup",async (req, res) => {
    //define the data
    const data = {
        username:req.body.username,
        firstname:req.body.firstname,
        surname:req.body.surname,
        password:req.body.password,
        age:req.body.age,
        breakfast:req.body.breakfast,
        lunch:req.body.lunch,
        dinner:req.body.dinner,
        height:req.body.height,
        weight:req.body.weight}


    //hashing passwords for users
    const saltRounds = 10 //number of salt rounds for password encryption
    const hashPassword = await bcrypt.hash(data.password,saltRounds)

    data.password = hashPassword //replace hashed password with original
//give the data to mongodb

    //check if user already exists in database
    const existingUser = await collection.findOne({username:req.body.username})

//if the user already exists -> error message to display
    if (existingUser){
        res.send("User already exists - Please login")
        }

//if user doesn't exist -> insert data into database
    else{

        await collection.insertMany([data])


    const name = req.body.username    
//once user has signed up -> homepage of site
    res.render('home', {username:name,
                breakfast:req.body.breakfast,
                lunch:req.body.lunch,
                dinner:req.body.dinner})
    }   

})



app.post("/login",async (req, res) => {
    //define the data
    try{
        //check to see if the name exists in the database
        const check = await collection.findOne({username:req.body.username})

        //check database to see hashed password matches with users input
        const passwordMatch = await bcrypt.compare(req.body.password, check.password)

        if (passwordMatch){
            const name = req.body.username
            res.render('home', {username:name})

        }

        else{
            res.send("Wrong Password - Please try again")

        }

        }
        //if name and password are both incorrect -> "wrong details"
        catch{
            res.send("Wrong Details - Please try again")
        }
    })


// EDAMAM SETUP //

// //aunthentification with Edamam (ID and Key)
// const APP_ID = '';
// const APP_KEY = '';


/*const getFoodItem = async () => {
      //query request from Edamam API
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json()
    setRecipes(data.hits)
    console.log(data.hits);
}
*/

//setting up connection to localhost server
const port = 1000;
app.listen(port,()=>{
    console.log(`Port ${port} Connected`)
})
