const express = require('express');
const router = express.Router();
const { addTask, getAllTask, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');
const auth = require("../middleware/authmiddleware");
const authorizeRole = require('../middleware/authorizeRole');

// create task
router.post("/", auth, addTask);

//get all task
router.get("/", auth, getAllTask);

//get task by id
router.get("/:id", auth, getTaskById);

//update task
router.put("/:id", auth, updateTask);

//delete task
router.delete('/:id',auth, deleteTask);

module.exports = router