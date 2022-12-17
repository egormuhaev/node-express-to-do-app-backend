const db = require('../config/configPostgres')
const uuid = require('uuid')

class UserController {
    async addNewUser(req, res){ 
        
        const {username, email, password} = req.body

        const allUsers = await db.query('SELECT * FROM person WHERE username = $1 and email = $2', [username, email])

        if (allUsers.rows.length === 0){
            while (true){
                var id = uuid.v4()
                const usedId = await db.query('SELECT * FROM person WHERE id = $1', [String(id)]);
                if (usedId.rows.length === 0){ 
                    break
                }
                else{
                    continue
                }
            }

            const newUser = await db.query('INSERT INTO person (id, email, password, username) VALUES ($1, $2, $3, $4) RETURNING *', [id, email, password, username])

            res.json({
                id: newUser.rows[0].id,
                email: newUser.rows[0].email,
                password: newUser.rows[0].password,
                username: newUser.rows[0].username,
                status: true,
                message: "Success"
            })
        }
        else {
            res.json({
                id: "", 
                email: "", 
                password: "", 
                username: "", 
                status: false, 
                message: "Cant create user"
            })
        }
    }

    async validationUsernameSignUp(req, res){
        // Добавить регулярку
        const { username } = req.body
        const usedUsername = await db.query('SELECT username FROM person WHERE username = $1', [username])

        if (usedUsername.rows.length === 0){
            res.json({
                statusValidation: true,
                message: "Success"

            })
        }
        else {
            res.json({
                statusValidation: false,
                message: "User username"
            })
        }
    }

    async validationPasswordSignUp(req, res){
        let reg = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g;
        const {password, confirmPassword} = req.body

        if(reg.test(password)){
            if(password === confirmPassword){
                res.json({statusValidation: true, message: "Success"})
            }
            else {
                res.json({statusValidation: false, message: "Passwords not confirm"});
            }
        }
        else {
            res.json({statusValidation: false, message: "Invalid Password"})
        }
    }

    async validationEmailSignUp(req, res){
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/;
        const {email} = req.body

        if(reg.test(email)){
            const usedEmail = await db.query('SELECT * FROM person WHERE email = $1', [email])

            if (usedEmail.rows.length  === 0) {
                res.json({statusValidation: true, message: "Success"})
            }
            else {
                res.json({statusValidation: false, message: "Used email"})
            }
        }
        else {
            res.json({statusValidation: false, message: "Invalid email"})
        }
    }

    async getUser(req, res){
        let reg = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g;
        const {username, password} = req.body

        let invalidPassword = reg.test(req.body.password);


        const oneUser = await db.query('SELECT * FROM person WHERE (email = $1 or username = $1) and password = $2', [username, password])

        if (oneUser.rows.length !== 0) {
            const message = invalidPassword ? "Invalid password" : "Success";
            res.json({
                id: oneUser.rows[0].id,
                username: oneUser.rows[0].username,
                password: oneUser.rows[0].password,
                invalidUsername: true,
                invalidPassword,
                message
            })
        }
        else {
            res.json({
                id: "",
                username: "",
                password: "",
                invalidUsername: true,
                invalidPassword,
                message: "Unknow user"
            })
        }
    }
}




module.exports = new UserController()










