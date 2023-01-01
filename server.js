const express =  require('express');
const cors = require('cors');
const userRouter = require('./routes/users.routes')
const groupRouter = require('./routes/group.routes')
const taskRouter = require('./routes/task.routes')

const app = express();
const PORT = process.env.PORT || 3001

try {
    app.use(cors());
    app.use(express.json()); 
}
catch(e) {
    console.log(e)
}


app.use('/api', userRouter)
app.use('/api', groupRouter)
app.use('/api', taskRouter)
app.use('/', taskRouter)

app.get('/test-jest-std-api', (req, res) => {
    res.json([
        {
            'id': 1,
            'name': 'Egor'
        },

        {
            'id': 2,
            'name': 'Andrey'
        },

        {
            'id': 3,
            'name': 'Katy'
        }
    ])
})


app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Server start on PORT: ${PORT}`)
});