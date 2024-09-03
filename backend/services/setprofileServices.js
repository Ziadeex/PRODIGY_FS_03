const { query } = require("../database/db");



const setProfile = async (user_id, profilepic) => {
    console.log(`----------------------------------------------------------------`)
    console.log(`user_id and profilepic ${user_id} ${profilepic}`)
        console.log(`setProfileservices 1`)
          console.log(`----------------------------------------------------------------`)
    const sql = `UPDATE users SET profilePic = ? WHERE user_id = ?`;
 
    try {
        console.log(`----------------------------------------------------------------`)
        console.log(`setProfileservices 2`)
          console.log(`----------------------------------------------------------------`)
      const result = await query(sql, [profilepic, user_id]);
        console.log(`profilepic after its updated ${JSON.stringify(result)}`)
        console.log(`----------------------------------------------------------------`)
        console.log(`setProfileservices 3`)
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
  

// const getProfile = async (user_id) => {
//     console.log(`----------------------------------------------------------------`)
//     console.log(`getProfile 1`)
//       console.log(`----------------------------------------------------------------`)
//     const sql = `SELECT profilePic from users WHERE user_id = ?`;
     
//     try {
//         console.log(`----------------------------------------------------------------`)
//     console.log(`getProfile 2`)
//       console.log(`----------------------------------------------------------------`)
//       const result = await query(sql, [user_id]);
//         console.log(`result after displaying profilePic ${JSON.stringify(result)}`)
//       if (result.affectedRows) {
        
//         const user = {client_id: result };  
//         return { status: 200, message: "Successful", user };
//       } else {
//         return { status: 401, message: "unable to add the user to the database" };
//       }
//     } catch (error) {
//       console.error(error);
//       return { status: 500, message: "internal error" };
//     }
//   };

const getProfile = async (userId) => {
    console.log(`----------------------------------------------------------------`)
    console.log(`getProfile 1`)
    console.log(`----------------------------------------------------------------`)
    const sql = `SELECT profilePic FROM users WHERE user_id = ?`;
     
    try {
        console.log(`----------------------------------------------------------------`)
        console.log(`getProfile 2`)
        console.log(`----------------------------------------------------------------`)
        const [result] = await query(sql, [userId]);
        console.log(`result after displaying profilePic ${JSON.stringify(result)}`)
        if (result) {
            return { status: 200, message: "Successful", user: { profilePic: result.profilePic } };
        } else {
            return { status: 401, message: "Unable to retrieve the user from the database" };
        }
    } catch (error) {
        console.error(error);
        return { status: 500, message: "Internal error" };
    }
};


module.exports = {
    setProfile,getProfile
      
  }