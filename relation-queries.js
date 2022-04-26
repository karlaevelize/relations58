const User = require("./models").user 
const TodoList = require("./models").todoList


//get the todoList with the user

const getTodoListWithUser = async () => {
  const todoLists = await TodoList.findAll({ raw: true, include: User })
  console.log("result:", todoLists)
}

// getTodoListWithUser()

//get one todoLists
const getOneTodoListWithUser = async (id) => {
  const todoList = await TodoList.findByPk(id, { raw: true, include: User })
  console.log("result:", todoList)
}

getOneTodoListWithUser(1)