const express = require('express')
const multer  = require('multer')
const cors = require('cors');
const flash = require("express-flash");
// const session = require('express-session');
// const pgSession = require('connect-pg-simple')(session);
const bcrypt = require("bcrypt");
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
app.use('/uploads',express.static('uploads'));
app.use(flash());
// app.use(session({
//   store: new pgSession({
//     pool: client,  // PostgreSQL client
//     tableName: 'session', // Optional, defaults to 'session'
//   }),
//   secret: 'secretitis', // Change to a strong secret key
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24 // 1 day
//   }
// }));

app.get('/', (req, res) => {
  res.send('Helloadf Wordlad')
})

app.get('/blogs/:cat',async (req,res)=>{
    const result = await client.query(
      req.params.cat !='all' ? `SELECT * FROM blogs WHERE category = '${req.params.cat}'`:queries.getBlogs);
    return res.json({"data":result.rows});
})

app.get('/blogsbyid/:id',async (req,res)=>{
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

app.post('/api/register',async (req,res)=>{
  const {username,email,password,confirm_password,role} = req.body;
  try {
    const roleResult = await client.query(queries.findUserByRole, [role]);
    if (password.length < 4) {
      return res.status(400).json({ message: "Password should have 4 minimum characters" });
    }
    if (password != confirm_password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const emailExists = await client.query(queries.findUserByEmail,[email]);
    if(emailExists.rowCount>0) return res.status(400).json({ message: "Email Already Exists" });
    const usernameExists = await client.query(queries.findUserByUsername,[username]);
    if(usernameExists.rowCount>0) return res.status(400).json({ message: "Username Already Exists" });
    const roleId = roleResult.rows[0].id;
    let hashedPassword = await bcrypt.hash(password, 10);
    await client.query(queries.addUser,[username,email,hashedPassword,roleId]);
    return res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user.' });
  }
})

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const userResult = await client.query(queries.findUserByEmail, [email]);
    
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // Save user info in session
    // req.session.user = {
    //   id: user.id,
    //   username: user.username,
    //   role: user.role_id
    // };
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})