const getBlogs = 'SELECT * from blogs';
const addBlogs = 'INSERT INTO blogs(author,title,image,post) VALUES($1,$2,$3,$4)'

module.exports = {
    getBlogs,
    addBlogs
}