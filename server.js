const express =  require('express');
const cors = require('cors');
const uuid = require('uuid');



const app = express();


const PORT = 3001;


app.use(cors());
app.use(express.json());


const dataUsers = [
    {
        id: "1",
        username: "egormuhaev",
        email: "egormuhaev@gmail.com",
        password: "Mevs2001"
    }
]


app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Server start on PORT: ${PORT}`)
});


app.post('/api_3/db/create_new_user', (req, res) => {
    let statusNewUser = true;
    let message = "Success";
    newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    console.log(newUser)

    console.log(1);

    for (user of dataUsers){
        if(user.email === newUser.email || user.username === newUser.username){
            console.log(2);
            statusNewUser = false;
            message = "cant create user";
            res.status(201).json({id: "", email: "", password: "", username: "", status: statusNewUser, message})
            break;
        }
    }

    if (statusNewUser){
        console.log(3);
        let id = uuid.v4();
        dataUsers.push({id, ...newUser})
        console.log(dataUsers)
        res.status(201).json({id, username: newUser.username, email: newUser.email, password: newUser.password, status: statusNewUser, message})
    }    
});


app.post('/api_2/validation/username/sign_up', (req, res) => {
    // Добавить регулярку

    let message = "Success";
    let statusValidation = true;

    for (let user of dataUsers) {
        if (user.username === req.body.username){
            statusValidation = false;
            message = "User username";
            break
        }
    }

    res.status(201).json({statusValidation, message});
});


app.post('/api_2/validation/password/sign_up', (req, res) => {
    let reg = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g;
    
    let message = "Success";
    let statusValidation = reg.test(req.body.password);

    if (statusValidation) {
        statusValidation = (req.body.password === req.body.confirmPassword);
        if (statusValidation){
            res.status(201).json({statusValidation, message});
        }
        else {
            message = "Passwords not confirm";
            res.status(201).json({statusValidation, message})
        }
    } 
    else {
        message = "Invalid Password";
        res.status(201).json({statusValidation, message})
    }


    console.log(`$--> (end_point): /api_2/validation/password/sign_up (data): { (password): ${req.body.password} } (status_validation): ${statusValidation} (status): ${message}`)
});


app.post('/api_2/validation/email/sign_up', (req, res) => {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/;
   
    let message = "Success";
    let statusValidation = reg.test(req.body.email);

    if(statusValidation){
        for (let user of dataUsers){
            if (user.email === req.body.email){
                message = "Used email";
                statusValidation = false;
                res.status(201).json({statusValidation, message});
                break;
            }
            else {
                statusValidation = true;
            }
        }
    }
    else {
        res.status(201).json({statusValidation, message: "Invalid email"});
    }
    res.status(201).json({statusValidation, message});


    console.log(`$--> (end_point): /api_2/validation/email/sign_up (data): { (email): ${req.body.email} } (status_validation): ${statusValidation} (status): ${message}`)
})


app.post('/api_1/get_user/', (req, res) => {
    let reg = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g;

    let invalidPassword = reg.test(req.body.password);
    let invalidUsername = true;
    let message;
    let id = "";


    if (!invalidPassword) {
        message = "Invalid password";
    } else {
        for (let user of dataUsers){
            if (
                (user.email === req.body.username || user.username === req.body.username)
                && user.password === req.body.password
            ){
                message = "Success";
                id = user.id;
                res.status(201).json({
                    id,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    invalidUsername,
                    invalidPassword,
                    message
                })
                console.log(`$--> (end_point): /api_1/get_user/ (data): { (username): ${req.body.username} (password): ${req.body.password} } (status): ${message}`)
                break
            }
            else {
                message = "Unknow user";
            }
        }
    }

    res.status(201).json(
        {
            id,
            username: `${req.body.username}`, 
            password: `${req.body.password}`, 
            invalidUsername,
            invalidPassword,
            message
        })

    console.log(`$--> (end_point): /api_1/get_user/ (data): { (username): ${req.body.username} (password): ${req.body.password} } (status): ${message}`)
});




