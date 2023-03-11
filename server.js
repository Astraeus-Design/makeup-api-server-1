'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
// import route handlers

const app = express();
app.use(cors());
// fetch post req.body fields as JSON
app.use(express.json());

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log('Express, Mongoose API listening port: ', PORT);
});

/***
 * Database stuff
 * collection products is in test
 */

mongoose.connect('mongodb://127.0.0.1:27017/Task_Manager', {
  //useNewUrlParser: true,
  //strictQuery: false
});

// create a schema
const userSchema = new mongoose.Schema({
  userName: String,
});

const taskSchema = new mongoose.Schema({
  taskName: String,
  dueDate: Date,
  status: String,
  description: String,
  priorityLevel: Number,
  assignedUser: String,
});

const userModel = mongoose.model('users', userSchema);
const taskModel = mongoose.model('tasks', taskSchema);

/*
function seedDatabase(naturalMakeup) {
  const makeup1 = new productModel({
    name: 'Lippie Pencil',
    brand: 'colourpop',
    price: 5.0,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/1338/0845/collections/lippie-pencil_grande.jpg?v=1512588769',
    description:
      'Lippie Pencil A long-wearing and high-intensity lip pencil that glides on easily and prevents feathering. Many of our Lippie Stix have a coordinating Lippie Pencil designed to compliment it perfectly, but feel free to mix and match!',
  });

  const makeup2 = new productModel({
    name: 'Rouge Dior Double Rouge',
    brand: 'Dior',
    price: 27.5,
    imageUrl:
      'https://www.dior.com/beauty/version-5.1432748111912/resize-image/ep/0/390/100/0/packshots%252FPDG_y0027279.jpg',
    description:
      'Inspired by professional techniques, Double Rouge combines two makeup trends: matte and metal.',
  });

  const makeup3 = new productModel({
    name: 'Rouge Dior Liquid',
    brand: 'Dior',
    price: 26.5,
    imageUrl:
      'https://www.dior.com/beauty/version-5.1432748111912/resize-image/ep/0/390/100/0/packshots%252FPDG_y0027269.jpg',
    description:
      'Rouge Dior has yet again been reinvented with the first liquid lipstick formula by Dior with multiple effects and surprising colour impact. Coverage, 12h* long wear and comfort: a true gem available in 3 vibrant finishes matte, metal and satin.',
  });

  const makeup4 = new productModel({
    name: 'Corrective Concealer Clay',
    brand: 'Iman',
    price: 10.0,
    imageUrl:
      'http://imancosmetics.com/resources/uploads/product_colors/85a2fea7e732950138372ef267748a36.jpg',
    description:
      '0.17 oz Silky and creamy formula smoothes on, covering dark circles, and tiny imperfections.',
  });

  // save the documents to the table (collection)
  makeup1.save();
  makeup2.save();
  makeup3.save();
  makeup4.save();
}
*/
// run the seeder
//seedDatabase();
//console.dir(naturalMakeup);

const getUsersFromDB = (req, res) => {
  userModel.find({}, function (error, usersArray) {
    if (error) {
      console.error('DB error: ' + error);
    } else {
      res.status(200).send(usersArray);
    }
  });
};

const getTasksFromDB = (req, res) => {
  productModel.find({}, function (error, tasksArray) {
    if (error) {
      console.error('DB error: ' + error);
    } else {
      res.status(200).send(tasksArray);
    }
  });
};

const addNewUser = async (req, res) => {
  const { userName } = req.body;

  let newUser = await userModel.create({
    userName,
  });
  // send all new makeup products to client
  // including one just added.
  userModel.find({}, function (error, usersArray) {
    if (error) {
      console.error('DB error: ' + error);
    } else {
      res.status(200).send(usersArray);
    }
  });
};

const addNewTask = async (req, res) => {
  const {
    taskName,
    dueDate,
    status,
    description,
    priorityLevel,
    assignedUser,
  } = req.body;

  let newTask = await taskModel.create({
    taskName,
    dueDate,
    status,
    description,
    priorityLevel,
    assignedUser,
  });

  // send all new makeup products to client
  // including one just added.
  taskModel.find({}, function (error, tasksArray) {
    if (error) {
      console.error('DB error: ' + error);
    } else {
      res.status(200).send(tasksArray);
    }
  });
};

const updateTask = async () => {
  const {
    taskName,
    dueDate,
    status,
    description,
    priorityLevel,
    assignedUser,
  } = req.body;

  const newTask = {
    taskName,
    dueDate,
    status,
    description,
    priorityLevel,
    assignedUser,
  };

  // id of makeup to update
  const id = req.params.id;

  try {
    const updatedTask = await taskModel.findByIdAndUpdate(id, newTask, {
      new: true,
      overwrite: true,
    });

    // send all tasks back

    let taskArray = await taskModel.find({});
    res.status(200).json({
      message: 'Successfully updated task',
      taskArray,
    });
  } catch (err) {
    res.json({
      message: `${err} - MongoDB update problem`,
    });
  }
};

const deleteTask = async () => {
  const id = req.params.id;

  try {
    await taskModel.findByIdAndDelete(id);
    // send all tasks back
    let taskArray = await taskModel.find({});
    res.status(200).json({
      message: 'Successfully deleted.',
      taskArray,
    });
  } catch (err) {
    res.json({
      message: `${err} - MongoDB delete issue`,
    });
  }
};

// localhost:3000/tasks endpoint -
app.get('/users', getUsersFromDB);

// create a user
app.post('/users', addNewUser);

// get all tasks from mongodb
app.get('/task', getTasksFromDB);

// create a task
app.post('/task', addNewTask);

// update a makeup product
app.put('/task/:id', updateTask);

// delete a makeup product
app.delete('/task/:id', deleteTask);
