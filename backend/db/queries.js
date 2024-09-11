const getBlogs = 'SELECT * FROM blogs';
const getBlogsByCategory = 'SELECT * FROM blogs WHERE category = $1';
const addBlogs = 'INSERT INTO blogs(author,title,image,post,category,author_id) VALUES($1,$2,$3,$4,$5,$6)';
const getBlogsById = 'SELECT * FROM blogs WHERE id = $1';
const addUser = 'INSERT INTO users(username,email,password,role_id) VALUES($1,$2,$3,$4)';
const findUserByUsername = 'SELECT * FROM users WHERE username = $1';
const findUserByEmail = 'SELECT * FROM users WHERE email = $1';
const findUserByRole = 'SELECT id FROM roles WHERE role_name = $1'
const getBlogsByAuthorId = 'SELECT * FROM blogs WHERE author_id = $1'

module.exports = {
    getBlogs,
    addBlogs,
    getBlogsById,
    getBlogsByCategory,
    addUser,
    findUserByUsername,
    findUserByEmail,
    findUserByRole,
    getBlogsByAuthorId
}