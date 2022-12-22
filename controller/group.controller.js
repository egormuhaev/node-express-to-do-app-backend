const db = require('../config/configPostgres')

class GroupController {
    async addNewGroupByUser(req, res){
        const {user_id, nameGroup} = req.body
        const userById = await db.query('SELECT * FROM person WHERE id = $1', [user_id])
        if (userById.rows.length !== 0){
            const newGroup = await db.query('INSERT INTO grouptask (user_id, name) VALUES ($1, $2) RETURNING *', [user_id, nameGroup])
            res.json({userId: newGroup.rows[0].user_id, name: newGroup.rows[0].name, id: newGroup.rows[0].id, status: true})
        }
        else {
            res.json({status: false, message: "Cant create new group"})
        }
    }

    async deleteGroup(req, res){

    }

    async renameGroup(req, res){

    }

    async getAllGroupByUser(req, res){
        const id = req.params.id
        const allGroupByUser = await db.query('SELECT * FROM grouptask WHERE user_id = $1', [id])
        res.json(allGroupByUser.rows)
    }   
}

module.exports = new GroupController()