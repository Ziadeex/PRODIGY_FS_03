// const { get } = require("http");
const { query } = require("../database/db");



const postItem = async (userId,name,description,profilepic) => {
    console.log(`----------------------------------------------------------------`)
        console.log(`postItem 1`)
          console.log(`----------------------------------------------------------------`)
    const sql = `INSERT INTO postitems (name, description, image, user_id)
VALUES (?,?,?,?);`;
 
    try {
        console.log(`----------------------------------------------------------------`)
        console.log(`postItem 2`)
          console.log(`----------------------------------------------------------------`)
      const result = await query(sql, [name,description,profilepic,userId]);
        console.log(`profilepic after its updated ${JSON.stringify(result)}`)
        console.log(`----------------------------------------------------------------`)
        console.log(`postItem 3`)
          console.log(`----------------------------------------------------------------`)
        if (result.affectedRows === 1) {
          await query (`SELECT * FROM users`)
        
        return {status: 200};
      } else {
        return { status: 401, message: "unable to add the profile to the users table" };
      }
    } catch (error) {
      console.error(error);
      return { status: 500, message: "internal error" };
    }
};
  

const getItem = async () => {
    const sql = `SELECT * FROM postitems`;
     
    try {
        const result = await query(sql);
        if (result) {
            return { status: 200, message: "Successful", user: { getItem: result } };
        } else {
            return { status: 401, message: "Unable to retrieve the user from the database" };
        }
    } catch (error) {
        console.error(error);
        return { status: 500, message: "Internal error" };
    }
};



const getItemu = async (user_id) => {
  const sql = `SELECT * FROM postitems WHERE user_id = ?`;
   
  try {
    const result = await query(sql, user_id);
    console.log(`getItemu result ${JSON.stringify(result)}`)
      if (result) {
          return { status: 200, message: "Successful",  result  };
      } else {
          return { status: 401, message: "Unable to retrieve the user from the database" };
      }
  } catch (error) {
      console.error(error);
      return { status: 500, message: "Internal error" };
  }
};
const getItemue = async (user_id, post_id, editItem) => {
  const { name, description, image } = editItem;
  const sql = image
    ? 'UPDATE postitems SET name = ?, description = ?, image = ? WHERE post_id = ? AND user_id = ?'
    : 'UPDATE postitems SET name = ?, description = ? WHERE post_id = ? AND user_id = ?';

  const params = image ? [name, description, image, post_id, user_id] : [name, description, post_id, user_id];

  try {
    const result = await query(sql, params);
    if (result.affectedRows) {
      return { status: 200, message: "Update successful", result };
    } else {
      return { status: 401, message: "Failed to update item" };
    }
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal error" };
  }
};




module.exports = {
    postItem,getItem,getItemu,getItemue
      
  }