const express =  require('express');
const cors = require('cors');
const userRouter = require('./routes/users.routes')


const app = express();
const PORT = process.env.PORT || 8080

app.use(cors());
app.use(express.json()); 
app.use('/api', userRouter)


app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Server start on PORT: ${PORT}`)
});

