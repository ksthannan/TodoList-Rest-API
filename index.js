const app = require("./app")
const dotEnv = require('dotenv')
dotEnv.config({
    path: './config.env'
})

app.listen(process.env.RUNNING_PORT, function(){
    console.log('Node server run success on http://'+process.env.SERVER_HOST+':' + process.env.RUNNING_PORT)
})

