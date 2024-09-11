import axios from "axios";
const apiUrl = "http://localhost:3000";
export const getBlogs = (cat) => {
  if(!cat) cat = 'all';
  return axios
    .get(apiUrl + "/blogs/"+cat)
    .then(result => {
      return result.data;
    })
    .catch(err => {
      return err;
    });
};

export const checkLogin = () => {
  return axios
    .get(apiUrl + "/checklogin")
    .then(result => {
      return result.data;
    })
    .catch(err => {
      return err;
    });
};

export const deleteBlog = async (blogId) => {
  try {
    const response = await axios.delete(`${apiUrl}/api/blogs/${blogId}`,{
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting blog', error);
    return { valid: false };
  }
};

export const getBlogsByAuthor = () => {
  return axios
    .get(apiUrl + "/author/blogs")
    .then(result => {
      return result.data;
    })
    .catch(err => {
      return err;
    });
};

export const postBlogs = (data) => {
  return axios
    .post(apiUrl + "/blogs", data)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getBlogById = (id) => {
  return axios
    .get(apiUrl + "/blogsbyid/"+id)
    .then(result => {
      return result.data;
    })
    .catch(err => {
      return err;
    });
};

export const uploadImage = (file)=>{
  const formdata = new FormData();
  formdata.append('file',file);
  const config = {
    headers:{
      'content-type':'multipart/form-data'
    }
  }
  return axios
    .post(apiUrl + "/blogsimage", formdata,config)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      return err;
    }); 
}
