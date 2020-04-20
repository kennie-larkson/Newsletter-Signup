//jshint esversion : 6

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')
const port = process.env.PORT || 3000




const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get('/',(req,res)=>{
    res.sendFile(`${__dirname}/signup.html`)
})

app.post('/',(req,res)=>{
    const subscriberFname = req.body.fname
    const subscriberLname = req.body.lname
    const subscriberEmail = req.body.email
    console.log(`
    ${subscriberFname}
    ${subscriberLname}
    ${subscriberEmail}
    `)

    const data = {
        
        members:[
            {
            email_address: subscriberEmail,
            status: "subscribed",
            merge_fields:{
                FNAME: subscriberFname,
                LNAME: subscriberLname
            }
        }
    ]
    
    };

    const jsonData = JSON.stringify(data)
    const url = "https://us4.api.mailchimp.com/3.0/lists/3f5533cdcd"
    const options = {
        method: "POST",
        auth:"kennie1:468bfcb3e94d38d459b9f7ea5f0db5a0-us4"
    }

    const request = https.request(url, options, (response)=>{
        response.on("data",(data)=>{
            console.log(JSON.parse(data))
        })
        
    })

    request.write(jsonData)
    request.end()
    // res.sendFile(`${__dirname}/success.html`)
    
});

//{"name":"Freddie'\''s Favorite Hats","contact":{"company":"Mailchimp","address1":"675 Ponce De Leon Ave NE","address2":"Suite 5000","city":"Atlanta","state":"GA","zip":"30308","country":"US","phone":""},"permission_reminder":"You'\''re receiving this email because you signed up for updates about Freddie'\''s newest hats.","campaign_defaults":{"from_name":"Freddie","from_email":"freddie@freddiehats.com","subject":"","language":"en"},"email_type_option":true}



app.listen(port, ()=>{
    console.log(`Newsletter server running on port: ${port}`)
})


//API KEY
//468bfcb3e94d38d459b9f7ea5f0db5a0-us4

//List ID
//3f5533cdcd