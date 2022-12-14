const db = require('../config/configPostgres')

class GroupController {
    async addNewGroupByUser(req, res){
        const {userId, nameGroup} = req.body
        const userById = await db.query('SELECT * FROM person WHERE id = $1', [userId])
        if (userById.rows.length !== 0){
            const newGroup = await db.query('INSERT INTO grouptask (user_id, name) VALUES ($1, $2) RETURNING *', [userId, nameGroup])
            res.json({userId: newGroup.rows[0].user_id, name: newGroup.rows[0].name, id: newGroup.rows[0].id, status: true})
        }
        else {
            res.json({status: false, message: "Cant create new group"})
        }
    }

    async deleteGroupById(req, res){
        const id = req.params.id
        const delGroup = await db.query('DELETE FROM grouptask WHERE id = $1 RETURNING *', [id])
        res.json(delGroup.rows)
    }

    async renameGroupById(req, res){
        const {newGroupName, id} = req.body
        const updGroup = await db.query('UPDATE grouptask SET name = $1 WHERE id = $2 RETURNING *', [newGroupName, id])
        res.json(updGroup.rows)
    }

    async getAllGroupByUser(req, res){
        const id = req.params.id
        const allGroupByUser = await db.query('SELECT * FROM grouptask WHERE user_id = $1', [id])
        res.json(allGroupByUser.rows[0])
    }   
}

module.exports = new GroupController()