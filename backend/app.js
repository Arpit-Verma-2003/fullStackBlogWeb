const express = require('express')
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.${file.originalname}`)
  }
})
const upload = multer({ storage: storage })
const client = require('./db/connection');
const queries = require("./db/queries");
const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Helloadf Wordlad')
})

app.get('/blogs',async (req,res)=>{
    const result = await client.query(queries.getBlogs);
    return res.json({"data":result.rows[0]});
})
app.post('/blogs',async (req,res)=>{
  const {author,title,image,post} = req.body;
  const result = await client.query(queries.addBlogs,[author,title,image,post]);
  return res.json({"data":result.rowCount});
})
app.post('/blogsimage', upload.single('file'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.json(req.file);
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})