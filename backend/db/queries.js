const getBlogs = 'SELECT * FROM blogs';
const getBlogsByCategory = 'SELECT * FROM blogs WHERE category = $1';
const addBlogs = 'INSERT INTO blogs(author,title,image,post,category) VALUES($1,$2,$3,$4,$5)';
const getBlogsById = 'SELECT * FROM blogs WHERE id = $1';
module.exports = {
    getBlogs,
    addBlogs,
    getBlogsById,
    getBlogsByCategory
}