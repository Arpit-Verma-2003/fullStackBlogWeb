import axios from "axios";
const apiUrl = "http://localhost:3000";
export const getBlogs = (cat = 'all', page = 1, limit = 9) => {
  return axios
    .get(apiUrl + `/blogs/${cat}?page=${page}&limit=${limit}`)
    .then(result => result.data)
    .catch(err => err);
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

export const getUsers = async () => {
  const response = await axios.get(apiUrl+'/users');
  return response.data;
};

export const getRoles = async () => {
  const response = await axios.get(apiUrl+'/roles');
  return response.data;
};


export const updateUserRole = async (userId, newRoleId) => {
  await axios.put(`${apiUrl}/users/${userId}/role`, { newRoleId });
};


export const createRole = async (newRole) => {
  try {
    const response = await axios.post(apiUrl+ '/roles', newRole);
    return response.data;
  } catch (err) {
    console.error('Error creating role:', err);
    throw err;  // Re-throw to handle error in handleSubmit
  }
};

export const getPermissions = async ()=>{
  try {
    return await axios.get(apiUrl+'/permissions')
    .then(result=>{
      return result.data;
    })
  } catch (err) {
    console.error('Error fetching permissions:', err);
  }
}

export const checkAdmin = () =>{
  return axios.get(apiUrl+"/checkAdmin")
  .then(result=>{
    return result.data;
  })
  .catch(err=>{
    return err;
  })
}

export const handleCommentSubmit = async (blogId, userId, content) => {
  try {
    const response = await axios.post(apiUrl+'/comments', {
      blog_id: blogId,
      user_id: userId,
      content: content
    });
    return response;
  } catch (error) {
    console.error("Error submitting comment:", error);
    throw error;
  }
};

export const getUserId = async()=>{
  try {
    const response = await axios.get(apiUrl+'/userId')
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const deleteComment = async (commentId, userId) => {
  try {
    const response = await axios.delete(`${apiUrl}/comments/${commentId}`, {
      data: { user_id: userId,
        comment_id:commentId
       }
    });
    return response;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

export const getCommentsByBlogId = async(blogId)=>{
  try {
    const response = await axios.get(apiUrl+`/comments/${blogId}`);
    return response;
  } catch (error) {
    throw error;
  }
}

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
