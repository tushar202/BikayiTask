const express=require('express');
const bodyParser = require('body-parser');
const dotenv=require('dotenv')
const connectDB=require('./utils/connectdb')


//importing router
const router=require('./routes/routes')

dotenv.config({path:'.env'})

connectDB()
const app = express();


app.use(bodyParser.json());


app.use(router)

const PORT=process.env.PORT

app.listen(PORT, () => {
    console.log(`Serving on PORT ${PORT}`);
})