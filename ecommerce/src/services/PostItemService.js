import http from "../http-common";
import { getToken } from "../UTILS/localStorageUtils";

 
const displayItems = () => {
    return http.get(`/item/displayItems`);
};
 

//displayItemsu

const displayItemsu = (user_id) => {
    return http.get(`/item/displayItemsu?user_id=${user_id}`);
};

// const updateUserPost = (post_id,editItem, user_id) => {

//     console.log(`updateUserPost post_id= ${post_id} `)
//     console.log(`updateUserPost user_id= ${user_id} `)
//     console.log(`updateUserPost editItem=${editItem.image} `)
//     return http.put(`/item/updateitem?post_id=${post_id}&&user_id=${user_id}&&editItem=${editItem}`);
//   };

const updateUserPost = (post_id, editItem, user_id) => {
    const formData = new FormData();
    formData.append("name", editItem.get("name"));
    formData.append("description", editItem.get("description"));
    formData.append("image", editItem.get("image") || null); // Optional image
  
    return http.put(`/item/updateitem?post_id=${post_id}&user_id=${user_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
  



const postItem = (userId,name,description,profilepic) => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('profilePic', profilepic);

    return http.post(`/item/postItem`, formData);
};


const PostItemService = {
    postItem,
    displayItems,
    displayItemsu,
    updateUserPost
}

export default PostItemService;