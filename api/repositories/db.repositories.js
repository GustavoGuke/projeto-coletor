async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
 
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:@localhost:3306/TESTE");
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

async function selectCustomers(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM evento ORDER BY ID;');
    return rows;
}

async function deleteTable(){
    const conn = await connect()
    const [rows] = await conn.query(`DROP TABLE evento CASCADE`)
    return rows
}

async function createtable(){
    const query = `CREATE TABLE evento(
        id serial PRIMARY KEY,
        nome VARCHAR (50) UNIQUE NOT NULL
       )`
    const conn = await connect()
    await conn.query(query)
}

async function insert(evento){
    const conn = await connect()
    const query = `INSERT INTO evento (nome) VALUES (?)`
    await conn.query(query, [evento])
}


async function updateCustomer(id, customer){
    const conn = await connect();
    const sql = 'UPDATE evento SET nome=? WHERE id=?';
    const values = [customer.nome, id];
    await conn.query(sql, values);
}

async function deleteCustomers(id){
    const conn = await connect()
    const sql = 'DELETE FROM evento WHERE ID=?'
    await conn.query(sql,id)
}

module.exports = {selectCustomers, deleteTable, createtable, insert, updateCustomer, deleteCustomers}