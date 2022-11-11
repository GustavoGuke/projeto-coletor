const {Router} = require("express")

const {selectCustomers, deleteTable, createtable, insert, updateCustomer, deleteCustomers} = require("../repositories/db.repositories")


const apiRouter = Router()

apiRouter.get("/", async (req, res) => {
    const data = await selectCustomers()
    res.send(data)
})

apiRouter.post("/" , async (req, res) => {
    const body = req.body
    const {nome} = body
    const data = await insert(nome)
    res.send(data)
})

apiRouter.put("/:id", async (req, res) => {
    const id  = parseInt(req.params.id)
    // const {nome} = req.body
    // console.log(id, nome )
    const data = await updateCustomer(id, req.body)
    res.send(data)
})

apiRouter.delete("/:id", async (req, res) => {
    const id = req.params.id
    const data = await deleteCustomers(id)
    res.send(data)
})

module.exports = {apiRouter}