const express =  require('express');
const cors = require('cors');
const userRouter = require('./routes/users.routes')
const groupRouter = require('./routes/group.routes')


const app = express();
const PORT = process.env.PORT || 3001

app.use(cors());
app.use(express.json()); 
app.use('/api', userRouter)
app.use('/api', groupRouter)


app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Server start on PORT: ${PORT}`)
});

