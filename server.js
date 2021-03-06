const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
app.use(bodyParser.json());
app.use(cors())
const database = {
  users: [
    {
      id: 1,
      login: 'admin',
      password: 'qwerty'
    }
  ]
}

const jwtsecret = "secret"

app.get('/', (req, res) => {res.send('success')})

app.post('/signin', (req, res) => {
  if (req.body.login === database.users[0].login && req.body.password === database.users[0].password) {
    res.json(
      {
      status:"success",
      token: jwt.sign({ name: "admin", color: "green"}, jwtsecret)
      })
  } else {
    res.status(400).json('error logging in')
  }
})

app.listen(process.env.PORT || 3000, ()=>{
  console.log(`app is running on port ${process.env.PORT}`)
})