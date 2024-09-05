import axios from "axios";
const apiUrl = "http://localhost:3000";
export const getBlogs = () => {
  return axios
    .get(apiUrl + "/blogs")
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
    .get(apiUrl + "/blogs"+id)
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
