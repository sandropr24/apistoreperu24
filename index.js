const express = require('express') 
const mysql = require('mysql2')  
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'storeperu'
})

db.connect((err) => {
  if(err) throw err;
  console.log("Conectado a la BD de StorePeru")
})

const PORT = 3000 

app.post('/productos', (req,res)=>{
  const {idmarca, descripcion, precio, stock, garantia} = req.body

  const sql = "INSERT INTO productos (idmarca, descripcion, precio, stock, garantia) VALUES (?,?,?,?,?)"

  db.query(sql, [idmarca, descripcion, precio, stock, garantia], (err, results)=> {
    if (err){
      return res.status(500).send({
        success: false,
        message: 'No se concretó el registro'
      })
    }

    res.send({
      success: true,
      message: 'Nuevo producto registrado',
      id: results.insertId
    })  
  })
})

app.get('/productos', (req,res)=>{
  const sql = "SELECT * FROM productos LIMIT 10"
  db.query(sql,(err , results)=>{
    if(err) return res.status(500).send({message: 'Error acceso a datos'})
    res.json(results)
  })
})


app.put('/productos/:id', (req, res) => { 
  const {id}= req.params
  const{idmarca,descripcion,precio,stock,garantia} = req.body
const sql = "UPDATE productos SET idmarca=?, descripcion=?, precio=?, stock=?, garantia=? WHERE id=?";
  db.query(sql,[idmarca,descripcion,precio,stock,garantia ,id], (err,results)=> {
    if(err){
      res.status(500).send({
        success: false,
        message:'No se concretó la actualización'
      })
    }

    res.send({
      success: true,
      message:'Registro actualizado'
    })
  })
})



app.delete('/productos/:id', (req, res) => { 

  const {id} = req.params

  const sql = "DELETE FROM productos WHERE id = ?"

  db.query(sql,[id], (err,results ) => {

    if (err){
      return res.status(500).send({
        success:false,
        message: 'No se puede eliminar el registro' 
      })
    }

    if (results.affectedRows == 0 ){
      return res.status(404).send({
        success:false,
        message: 'No existe el producto'
      })
    }

    res.send({
      success:true,
      message: 'Eliminado correctamente'
    })

  })

})


app.listen(PORT, () => {
  console.log("Servidor iniciado en http://localhost:3000")
})
