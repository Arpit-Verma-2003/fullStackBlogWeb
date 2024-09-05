const getBlogs = 'SELECT * from blogs';
const addBlogs = 'INSERT INTO blogs(author,title,image,post,category) VALUES($1,$2,$3,$4,$5)';
const getBlogsById = 'SELECT * from blogs WHERE id = $1';
module.exports = {
    getBlogs,
    addBlogs,
    getBlogsById
}