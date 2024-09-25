const getBlogs = 'SELECT * FROM blogs';
const addBlogs = 'INSERT INTO blogs(author,title,image,post,category,author_id) VALUES($1,$2,$3,$4,$5,$6)';
const getBlogsById = 'SELECT * FROM blogs WHERE id = $1';
const addUser = 'INSERT INTO users(username,email,password,role_id) VALUES($1,$2,$3,$4)';
const findUserByUsername = 'SELECT * FROM users WHERE username = $1';
const findUserByEmail = 'SELECT * FROM users WHERE email = $1';
const findUserByRole = 'SELECT id FROM roles WHERE role_name = $1'
const getBlogsByAuthorId = 'SELECT * FROM blogs WHERE author_id = $1 AND title ILIKE $2'
const addComment = 'INSERT INTO comments(blog_id,user_id,content) VALUES($1,$2,$3)';
const getComments = 'SELECT comments.id,comments.content,comments.user_id, users.username, comments.created_at FROM comments JOIN users ON comments.user_id = users.id WHERE blog_id = $1';
const getPermissions = 'SELECT * FROM permissions';
const addRole = 'INSERT INTO roles(role_name) VALUES($1) RETURNING id';
const addRoleWPermissions = 'INSERT INTO roles_permissions(role_id,permission_id) VALUES($1,$2)';
const getRoles = 'SELECT role_name FROM roles';
const getRolePermissions = 'SELECT p.permission_name as permission_name FROM permissions p INNER JOIN roles_permissions rp ON p.id = rp.permission_id WHERE rp.role_id = $1'
const fetchUsers = 'SELECT u.id, u.username, r.role_name FROM users u INNER JOIN roles r ON u.role_id = r.id'
const getCategories = 'SELECT * FROM categories'
const addCategories = 'INSERT INTO categories (name) VALUES ($1) RETURNING *';
const updateBlog = 'UPDATE blogs SET title = $1, image = $2, post = $3, category = $4 WHERE id = $5';
const deleteSelectedUser = 'DELETE FROM users WHERE id = $1';
const deleteCategory = `DELETE FROM categories WHERE name = $1 RETURNING *`;
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
    getComments,
    getPermissions,
    addRole,
    addRoleWPermissions,
    getRoles,
    getRolePermissions,
    fetchUsers,
    getCategories,
    addCategories,
    updateBlog,
    deleteSelectedUser,
    deleteCategory
}