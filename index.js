const express = require("express")
const User = require("./models").user
const TodoList = require("./models").todoList 
const TodoItem = require("./models").todoItem

//start an express instance
const app = express()

//define a port
const PORT = 4000

//middlewares
//it's called before we get to the endpoint
app.use(express.json())

const helloMiddleware = (request, response, next) => {
  console.log("in middleware")
  next()
}

const randomAuthorized = (request, response, next) => {
  const myNumber = Math.random() * 10
  console.log("number", myNumber)

  if (myNumber < 5) {
    response.status(401).send("Not authorized in this space")
  }  else {
    next()
  }
}

//We will create our server here

//Welcome endpoint
app.get("/", randomAuthorized, async (request, response, next) => {
  try {
    response.send("Welcome to my API")
  } catch (error) {
    console.log(error)
    next(error)
  }
})

//GET/READ -> retrieve data, read data, only method browser can handle

//send a list o users
app.get("/users", async (request, response, next) => {
  try {
    const users = await User.findAll({ include: {
      model: TodoList
    }})
    response.send(users)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

//POST/CREATE -> creating entry in the table (post picture, create account)
//http :4000/users name=Banana email=banana@bana.coom password=banana phone=bana
app.post("/users", async (request, response, next) => {
  try {
    const { name, email, password, phone } = request.body
    const newUser = await User.create({ name, email, password, phone })
    response.send(newUser)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
//UPDATE -> alter existing data (update profile picture, password)
// http PATCH :4000/users/3 phone=4343
app.patch("/users/:id", async (request, response, next) => {
  try {
   const { phone, name } = request.body
   const { id } = request.params

  // first find the user
  const user = await User.findByPk(id)

  //then update
  const updatedUser = await user.update({ phone, name }) 

  response.send(updatedUser)

  } catch (error) {
    console.log(error)
    next(error)
  }
})

//DELETE -> deletes an entry

app.delete("/users/:id", async (request, response, next) => {
  try {
    const { id } = request.params

    //first find the user
    const user = await User.findByPk(id)

    if(!user){
      return response.status(404).send("Sorry, no user with that id")
    } 

    //then destroy the user
    const destroyedUser = user.destroy()

    //another method
    //user.destroy({ where: { id: id}})

    response.send({ user: destroyedUser, message: "User terminated" })

  } catch (error) {
    console.log(error)
    next(error)
  }
})

//start listening
app.listen(PORT, () => console.log(`Listening on ${PORT}`))