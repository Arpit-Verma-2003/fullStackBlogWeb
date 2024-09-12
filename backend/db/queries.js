const getBlogs = 'SELECT * FROM blogs';
const addBlogs = 'INSERT INTO blogs(author,title,image,post,category,author_id) VALUES($1,$2,$3,$4,$5,$6)';
const getBlogsById = 'SELECT * FROM blogs WHERE id = $1';
const addUser = 'INSERT INTO users(username,email,password,role_id) VALUES($1,$2,$3,$4)';
const findUserByUsername = 'SELECT * FROM users WHERE username = $1';
const findUserByEmail = 'SELECT * FROM users WHERE email = $1';
const findUserByRole = 'SELECT id FROM roles WHERE role_name = $1'
const getBlogsByAuthorId = 'SELECT * FROM blogs WHERE author_id = $1'
const addComment = 'INSERT INTO comments(blog_id,user_id,content) VALUES($1,$2,$3)';
const getComments = 'SELECT comments.id,comments.content,comments.user_id, users.username, comments.created_at FROM comments JOIN users ON comments.user_id = users.id WHERE blog_id = $1';
module.exports = {
    getBlogs,
    addBlogs,
    getBlogsById,
    addUser,
    findUserByUsername,
    findUserByEmail,
    findUserByRole,
    getBlogsByAuthorId,
    addComment,
    getComments
}