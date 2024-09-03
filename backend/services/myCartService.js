// const { get } = require("http");
const { query } = require("../database/db");



const deleteMyCart = async (userId, postID) => {
  console.log(`deleteMyCart 111111111111 ${userId} postid ${postID}`)
    console.log(`----------------------------------------------------------------`)
        console.log(`postItem 1`)
          console.log(`----------------------------------------------------------------`)
    const sql = 'DELETE FROM mycart WHERE user_id = ? AND post_id = ?';
    try {
        console.log(`----------------------------------------------------------------`)
        console.log(`postItem 2`)
          console.log(`----------------------------------------------------------------`)
      const result = await query(sql, [userId,postID]);
        console.log(`profilepic after its updated ${JSON.stringify(result)}`)
        console.log(`----------------------------------------------------------------`)
        console.log(`postItem 3`)
          console.log(`----------------------------------------------------------------`)
        if (result.affectedRows) {
         const Selectquery =  await query (`SELECT * FROM mycart WHERE user_id = ?`, [userId])
        
        if (Selectquery.length > 0)
          return {status: 200, message: "Item deleted successfully"};

        return { status: 401, message: "unable to diaplay the changes in the cart" };
      } else {
        return { status: 401, message: "unable to delete the item in the cart" };
      }
    } catch (error) {
      console.error(error);
      return { status: 500, message: "internal error" };
    }
};
  
// const displayMyCart = async (userId) => {
//   console.log(`----------------------------------------------------------------`);
//   console.log(`displayMyCart 1`);
//   console.log(`userid from services displaymycart ${userId}`)
//   console.log(`----------------------------------------------------------------`);



//   try {

//     const sql = `SELECT post_id FROM mycart WHERE user_id = ?`;
//     const displaycart = `SELECT * FROM postitems WHERE post_id = ?`;

//       console.log(`----------------------------------------------------------------`);
//       console.log(`displayMyCart 2`);
//       console.log(`----------------------------------------------------------------`);


//     const result = await query(sql, [userId]);

    
//       console.log(`----------------------------------------------------------------`);
//       console.log(`results from displaymycart ${JSON.stringify(result)}`);
//       console.log(`----------------------------------------------------------------`);
//       if (result.length === 0) {
//           return { status: 200, message: "No items in cart", displayCart: [] };
//       }

//       const cartItems = [];
      
//       for (let i = 0; i < result.length; i++) {
//           const postId = result[i].post_id;

//           // Fetch item details for each post_id
//           const itemDetails = await query(displaycart, [postId]);

//           if (itemDetails.length > 0) {
//               cartItems.push(itemDetails[0]);
//           }
//       }

//       console.log(`result after displaying displayMyCart ${JSON.stringify(cartItems)}`);

//       if (cartItems.length > 0) {
//           return { status: 200, message: "Successful", displayCart: cartItems };
//       } else {
//           return { status: 401, message: "Unable to display your cart" };
//       }

//   } catch (error) {
//       console.error(error);
//       return { status: 500, message: "Internal server error" };
//   }
// };


const addMyCart = async (userId,postID) => {
  console.log(`----------------------------------------------------------------`)
  console.log(`Hiiiii`)
  console.log(`getProfile 1`)
  console.log(`----------------------------------------------------------------`)
  const sql = `INSERT INTO mycart (user_id, post_id) VALUES (?,?)`;
   
  try {
      console.log(`----------------------------------------------------------------`)
      console.log(`getProfile 2`)
      console.log(`----------------------------------------------------------------`)
      const result = await query(sql,[userId,postID]);
    console.log(`result after addMyCart ${JSON.stringify(result)}`)
    
    if (result.affectedRows === 1) {
     
      return { status: 200, message: "Successful"};
  } else {
    return { status: 401, message: "unable to add to your cart" };
    }
    
  } catch (error) {
      console.error(error);
      return { status: 500, message: "Internal error" };
  }
};


const displayMyCart = async (userId) => {
  console.log(`----------------------------------------------------------------`);
  console.log(`displayMyCart 1`);
  console.log(`UserID from services displayMyCart: ${userId}`);
  console.log(`----------------------------------------------------------------`);

  const sql = `SELECT post_id FROM mycart WHERE user_id = ?`;
  const displaycart = `SELECT * FROM postitems WHERE post_id = ?`;

  try {
      console.log(`----------------------------------------------------------------`);
      console.log(`displayMyCart 2`);
      console.log(`----------------------------------------------------------------`);

      // Fetch all post_ids in the user's cart
      const result = await query(sql, [userId]);
      console.log(`----------------------------------------------------------------`);
      console.log(`displayMyCart 3`);
      console.log(`----------------------------------------------------------------`);
      console.log(`SQL Query Result for mycart: ${JSON.stringify(result)}`);
      console.log(`----------------------------------------------------------------`);
      console.log(`displayMyCart 4`);
      console.log(`----------------------------------------------------------------`);
    if (result.length === 0) {
      console.log(`----------------------------------------------------------------`);
      console.log(`displayMyCart 5`);
      console.log(`----------------------------------------------------------------`);
          return { status: 200, message: "No items in cart", displayCart: [] };
    }
    
    console.log(`----------------------------------------------------------------`);
    console.log(`displayMyCart 6`);
    console.log(`----------------------------------------------------------------`);

      const cartItems = [];
      
      for (let i = 0; i < result.length; i++) {
          const postId = result[i].post_id;
          console.log(`Fetching details for post_id: ${postId}`);

          // Fetch item details for each post_id
          const itemDetails = await query(displaycart, [postId]);

          console.log(`SQL Query Result for postitems with post_id ${postId}: ${JSON.stringify(itemDetails)}`);

          if (itemDetails.length > 0) {
              cartItems.push(itemDetails[0]);
          }
      }

      console.log(`Result after displaying displayMyCart: ${JSON.stringify(cartItems)}`);

      if (cartItems.length > 0) {
          return { status: 200, message: "Successful", displayCart: cartItems };
      } else {
          return { status: 401, message: "Unable to display your cart" };
      }

  } catch (error) {
      console.error(error);
      return { status: 500, message: "Internal server error" };
  }
};


module.exports = {
    deleteMyCart,displayMyCart,addMyCart
      
  }