const db = require('../config/configPostgres')


class TaskController {
    async addNewTask(req, res){
        const {
            name,
            discription, 
            deadline, 
            notification, 
            tags, 
            important, 
            group, 
            user_id} = req.body
        
            var groupFeg = group

        try {
            if (group === ""){
                const nameDefaulGroup = 'default';
                const defaultGroup = await db.query("SELECT * FROM grouptask WHERE user_id = $1 AND name = $2", [user_id, nameDefaulGroup])
                console.log(defaultGroup.rows.length)
                if (defaultGroup.rows.length !== 0){
                    console.log(defaultGroup.rows[0].id)
                    groupFeg = defaultGroup.rows[0].id
                }
                else {
                    res.json({message: "Error"})
                }
            }
            
        
            const newTask = await db.query('INSERT INTO task (name, description, deadline, notification, tags, important, status, group_id, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', 
            [name, discription, deadline, notification, tags, important, false, groupFeg, user_id])
            res.json(newTask.rows)
        }
        catch(e){
            console.log(e)
            res.json({message: e})
        }
        
    }

    async deleteTaskById(req, res){
        const id = req.params.id
        try {
            const delTask = await db.query('DELETE INTO task WHERE id = $1 RETURNING *', [id]) 
            res.json(delTask.rows)
        }
        catch(e){
            console.log(e)
            res.json({message: e})
        }
    }

    async comleteTaskById(req, res){
        const id = req.params.id
        try {
            const tasks = await db.query('SELECT * FROM task WHERE id = $1', [id])
            const newTaskStatus =  !Boolean(tasks.rows[0].status)
            const updateTask = await db.query('UPDATE task SET stasus = $1 WHERE id = $2 RETURNING *', [id, newTaskStatus])
            res.json(updateTask.rows)
        }
        catch(e){
            res.json(e)
        }
    }

    async taskAddToGroup(req, res){
        const {task_id, group_id} = req.body
        try{   
            const updateTask = await db.query('UPDATE task SET group_id = $1 WHERE id = $2 RETURNING *', [group_id, task_id])
            res.json(updateTask.rows)
        }
        catch(e){
            res.json(e)
        }
    }

    async setImpTaskById(req, res){
        const id = req.params.id
        try {
            const impTaskStatus = await db.query('SELECT * FROM task WHERE id = $1', [id])
            const newTaskStatus = !Boolean(impTaskStatus.rows[0].important)
            const updateTask = await db.query('UPDATE task SET important = $1 WHERE id = $2 RETURNING *', [newTaskStatus, id])
            res.json(updateTask.rows)
        }
        catch(e){
            console.log(e)
            res.json({message: e})
        }
    }

    async getAllTaskByUserId(req, res){
        const user_id = req.params.id
        try {
            const allTasks = await db.query('SELECT * FROM task WHERE id = $1', [user_id])
            res.json(allTasks.rows)
        }
        catch(e) {
            console.log(e)
            res.json(e)
        }
    }   
}

module.exports = new TaskController()