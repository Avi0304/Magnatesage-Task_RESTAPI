const Task = require("../models/Task");


// create task 
const addTask = async (req, res) => {
    try {
        const { title, description, status } = req.body

        if (
            !title || typeof title !== 'string' || title.trim() === '' ||
            (description && typeof description !== 'string') ||
            (status && !['pending', 'in-progress', 'completed'].includes(status))
        ) {
            return res.status(400).json({ message: 'Invalid input: ensure title is a non-empty string, description is a string, and status is one of [pending, in-progress, completed]' });
        }

        const task = new Task({
            title: title.trim(),
            description,
            status,
            userId: req.user.id
        });

        await task.save();
        res.status(201).json({ message: "Task Add successfully...", task });


    } catch (error) {
        console.error("Create Task Error", error);
        res.status(400).json({ message: "Failed to create task...", error: error.message })
    }
}

//get task
const getAllTask = async (req, res) => {
    try {
        const {status} = req.query;
        const filter = {userId: req.user.id};
        
        if(status && ['pending', 'in-progress','completed'].includes(status)){
            filter.status = status;
        }

        const tasks = await Task.find(filter);
        res.status(201).json(tasks)
    } catch (error) {
        console.error("Get all task error: ", error);
        res.status(400).json({ message: "Failed to get all tasks...", error: error.message })
    }
}

//get task by id
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });

        if (!task) {
            return res.status(404).json({ message: "Task not found..." })
        }
        res.status(201).json(task);
    } catch (error) {
        console.error("Get Task by ID Error: ", error);
        res.status(400).json({ message: "Invalid Task ID", error: error.message })
    }
}

//update task
const updateTask = async (req, res) => {
    try {
        const { title, description, status } = req.body

        if (
            !title || typeof title !== 'string' || title.trim() === '' ||
            (description && typeof description !== 'string') ||
            (status && !['pending', 'in-progress', 'completed'].includes(status))
        ) {
            return res.status(400).json({ message: 'Invalid input: ensure title is a non-empty string, description is a string, and status is one of [pending, in-progress, completed]' });
        }

        const updateFields = {
            ...(title && { title: title.trim() }),
            ...(description && { description }),
            ...(status && { status }),
            updatedAt: Date.now()
        };

        const updateTask = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            updateFields,
            { new: true }
        );

        if (!updateTask) {
            return res.status(404).json({ message: "Task not found or Unauthorized..." })
        }
        res.status(200).json({ message: "Task Update successfully...", updateTask });
    } catch (error) {
        res.status(400).json({ message: "Update failed...", error: error.message })
    }
}

const deleteTask = async (req, res) => {
    try {
        const deleted = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

        if (!deleted) {
            res.status(404).json({ message: "Task not found..." })
        }

        res.status(200).json({ message: "Task Delete Successfuly..." });
    } catch (error) {
        console.error("Delete task error: ", error);
        res.status(400).json({ message: "Task Delete Failed...", error: error.message })
    }
}

module.exports = { addTask, getAllTask, getTaskById, updateTask, deleteTask }