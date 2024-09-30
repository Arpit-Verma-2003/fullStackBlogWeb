const express = require('express')
const multer  = require('multer')
const cors = require('cors');
const flash = require("express-flash");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require("bcrypt");
require("dotenv").config();
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
const bodyParser = require('body-parser');
const app = express()
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: ["https://blog-frontend-ndqn.onrender.com", "http://localhost:5173"],
  methods: ["POST","GET","DELETE","PUT"],
  credentials: true 
}));
app.use('/uploads',express.static('uploads'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(flash());
app.use(session({
  secret:'secret',
  resave:false,
  saveUninitialized:true,
  cookie:{
    secure:false,
    maxAge: 1000*60*60*24
  }
}))
app.get('/', (req, res) => {
  res.send('Helloadf Wordlad')
})

app.get('/checkLogin',async (req,res)=>{
      if(req.session.user){ 
        try {
          const roleId = req.session.user.role;
          const result = await client.query(queries.getRolePermissions,[roleId]);
          const permissions = result.rows.map(row=>row.permission_name);
          return res.json({"valid":true,"role":req.session.user.role,"username":req.session.user.username,"permissions":permissions,"id":req.session.user.id});
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: 'Error fetching role permissions' });
        }
      }
      else return res.json({"valid":false});
})

app.get('/userId',(req,res) => {
  if(req.session.user){
    return res.json({"userId":req.session.user.id});
  }else return res.json({"valid":false});
})

app.get('/checkAdmin',(req,res)=>{
  if(req.session.user){
    if(req.session.user.role == 1){
      return res.json({"valid":true,"login":true});
    }
    return res.json({"valid":false,"login":true});
  }else{
    return res.json({"valid":false,"login":false});
  }
})

app.get('/roles',async (req,res)=>{
  try {
    const result = await client.query(queries.getRoles);
    return res.status(201).json(result.rows);
  } catch (error) {
    return res.json({message:"error fetching the roles"});
  }
})

app.get('/comments/:blogId',async(req,res)=>{
  const {blogId} = req.params;
  try {
    const result = await client.query(queries.getComments,[blogId]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({message:"error fetching the comments"});
  }
})

app.get('/permissions',async(req,res)=>{
  try {
    const result = await client.query(queries.getPermissions);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({message:"unable to fetch the permissions"});
  }
})

app.get('/users', async (req, res) => {
  try {
    const result = await client.query(queries.fetchUsers);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users.' });
  }
});

app.put('/users/:userId/role', async (req, res) => {
  const { userId } = req.params;
  const { newRoleId:roleName } = req.body; 
  console.log(userId,roleName);
  try {
    const roleResult = await client.query('SELECT id FROM roles WHERE role_name = $1', [roleName]);
    const roleId = roleResult.rows[0].id;
    await client.query('UPDATE users SET role_id = $1 WHERE id = $2', [roleId, userId]);
    res.status(200).json({ message: 'User role updated successfully.' });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Error updating user role.' });
  }
});

app.delete('/users/:userId',async (req,res)=>{
  const {userId} = req.params;
  try {
    await client.query(queries.deleteSelectedUser,[userId]);
    res.status(200).json({message:'User Successfully Deleted'});
  } catch (error) {
    console.error('Error Deleting The User :', error);
    res.status(500).json({ message: 'Error Deleting The User' });
  }
})

app.put('/blogs/:id',async(req,res)=>{
  const {id} = req.params;
  const { title, image, post, category} = req.body;
  try {
    const checkResult = await client.query(queries.getBlogsById,[id]);
    if(checkResult.rowCount === 0){
      return res.status(404).json({ message: 'Blog not found.' });
    }
    await client.query(queries.updateBlog,[title, image, post, category,id]);
    res.status(200).json({success: true, message: 'Blog updated successfully.' });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Error updating blog.' });
  }
})

app.post('/roles',async(req,res)=>{
  const {roleName,permissionIds} = req.body;
  try {
    const result = await client.query(queries.addRole,[roleName]);
    const roleId = result.rows[0].id;
    for(const permissionId of permissionIds){
      await client.query(queries.addRoleWPermissions,[roleId,permissionId]);
    }
    res.status(201).json({message:"Added a new role successfully"});
  } catch (error) {
    res.status(500).json({message:"Unable to add the new role",err:error});
  }
})

app.post('/comments',async(req,res)=>{
  const{blog_id,user_id,content} = req.body;
  try {
    await client.query(queries.addComment,[blog_id,user_id,content]);
    res.status(201).json({message:"successfully added comment"});
  } catch (error) {
    console.error("err",error);
    res.status(500).json({message:"error in adding comment"});
  }
})

app.delete('/comments/:commentId', async (req, res) => {
  const userId = req.body.user_id;
  const commentId = req.body.comment_id;
  if(req.session.user){
    const roleId = req.session.user.role;
    try {
      const result1 = await client.query(queries.getRolePermissions,[roleId]);
      const userPermissions = result1.rows.map(row => row.permission_name);
      if(userPermissions.includes('delete_any_comment')){
        await client.query('DELETE FROM comments WHERE id = $1', [commentId]);
        return res.status(200).json({ message: 'Comment deleted successfully.' });
      }
      const result = await client.query('SELECT * FROM comments WHERE id = $1', [commentId]);
      const comment = result.rows[0];
  
      if (comment.user_id !== userId) {
        return res.status(403).json({ message: 'You can only delete your own comments.' });
      }
  
      await client.query('DELETE FROM comments WHERE id = $1', [commentId]);
      res.status(200).json({ message: 'Comment deleted successfully.' });
    } catch (error) {
      console.error('Error deleting comment:', error);
      res.status(500).json({ message: 'Error deleting comment.' });
    }
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed', error: err });
    }
    res.clearCookie('connect.sid'); // Clear the cookie stored in the user's browser
    return res.status(200).json({ message: 'Logout successful' });
  });
});

app.get('/blogs/:cat',async (req,res)=>{
  const { cat } = req.params;
  const { page = 1, limit = 9,search ='' } = req.query;
  const offset = (page - 1) * limit;
  let query = cat !== 'all' 
  ? `SELECT * FROM blogs WHERE category = '${cat}'`
  : `SELECT * FROM blogs `;
  if (search) {
    if(cat!=='all') query += ` AND (title ILIKE '%${search}%' OR post ILIKE '%${search}%')`;
    else query += `WHERE title ILIKE '%${search}%' OR post ILIKE '%${search}%'`
  }
  query+= `LIMIT ${limit} OFFSET ${offset}`;
  try {
    const result = await client.query(query);
    const valid = !!req.session.user;
    return res.json({ data: result.rows, valid });
  } catch (err) {
    return res.status(500).json({ error: 'Server Error' });
  }
})

app.get('/categories',async(req,res)=>{
  try {
    const result = await client.query(queries.getCategories);
    return res.json({data:result.rows});
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Error in getting the Categories"});
  }
})

app.post('/categories',async(req,res)=>{
  const {name} = req.body;
  try {
    const result = await client.query(queries.addCategories,[name]);
    return res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Error in adding the category"});
  }
})

app.delete('/categories/:categoryName',async(req,res)=>{
  const {categoryName} = req.params;
  try {
    const result = await client.query(queries.deleteCategory, [categoryName]);
    if (result.rowCount > 0) {
      return res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } else {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Error in deleting the category"});
  }
})

app.get('/blogsbyid/:id',async (req,res)=>{
  const id = req.params.id;
  const result = await client.query(queries.getBlogsById,[id]);
  return res.json({"data":result.rows});
})

app.get('/author/blogs', async (req, res) => {
  const search = req.query.search || '';
  if(req.session.user){
    const userId = req.session.user.id;
    const result = await client.query(queries.getBlogsByAuthorId, [userId,`%${search}%`]);
    return res.json({ valid: true, data: result.rows });
  }
});

app.post('/blogs',async (req,res)=>{
  const {author,title,image,post,category} = req.body;
  const result = await client.query(queries.addBlogs,[author,title,image,post,category,req.session.user.id]);
  return res.json({"data":result.rowCount});
})
app.post('/blogsimage', upload.single('file'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.json(req.file);
})

app.delete('/api/blogs/:id', async (req, res) => {
  const blogId = req.params.id;
  const userId = req.session.user.id; 
  
    const result = await client.query('DELETE FROM blogs WHERE id = $1 RETURNING *', [blogId]);
    if (result.rows.length > 0) {
      res.json({ valid: true, message: "Blog deleted" });
    } else {
      res.status(403).json({ valid: false, message: "Unauthorized" });
    } 
});


app.post('/api/register',async (req,res)=>{
  const {username,email,password,confirm_password,role} = req.body;
  try {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
    const roleResult = await client.query(queries.findUserByRole, [role]);
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character." });
    }
    
    if (password !== confirm_password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    if (password.length < 6) {
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
    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role_id
    };
    userConst = req.session.user;
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
      }
      return res.status(200).json({ message: "Login successful", userDetails: req.session.user });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
