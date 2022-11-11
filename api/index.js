const express = require("express")
const cors = require("cors")
const app = express()
const {apiRouter} = require("./routes/api.routes")

app.use(express.json())
app.use(express.urlencoded({extended:false}))

const PORT = 5000
app.use(cors())
app.use(apiRouter)


app.listen(PORT, ()=> {
    console.log(`Server OK ${PORT}`)
})