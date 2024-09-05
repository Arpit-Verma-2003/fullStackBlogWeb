const express = require('express')
const multer  = require('multer')
const cors = require('cors');
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
app.use(cors());
app.use('/uploads',express.static('uploads'))
app.get('/', (req, res) => {
  res.send('Helloadf Wordlad')
})

app.get('/blogs',async (req,res)=>{
    const result = await client.query(queries.getBlogs);
    return res.json({"data":result.rows});
})

app.get('/blogs/:id',async (req,res)=>{
  const id = req.params.id;
  const result = await client.query(queries.getBlogsById,[id]);
  return res.json({"data":result.rows});
})

app.post('/blogs',async (req,res)=>{
  const {author,title,image,post,category} = req.body;
  const result = await client.query(queries.addBlogs,[author,title,image,post,category]);
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