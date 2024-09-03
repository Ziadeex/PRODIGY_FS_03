const {
    postItem,getItem,getItemu,getItemue
} = require("../services/itemService");
  
//displayItemcontrollerue
const displayItemcontrollerue = async (req, res) => {
    const { user_id, post_id } = req.query;
    const { name, description } = req.body;
    const image = req.file ? req.file.filename : null; // Handle optional image upload
  
    try {
      const result = await getItemue(user_id, post_id, { name, description, image });
      if (result.status === 200) {
        return res.status(200).json({
          message: "Item updated successfully",
          items: result,
        });
      } else {
        return res.status(401).json({ message: "Failed to update item" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };


const displayItemcontrolleru = async (req, res) => {
    console.log(`req.query displayItemcontroller 1`);
    const { user_id } = req.query;

    try {
        const result = await getItemu(user_id);
        console.log(`result getitem backend ${JSON.stringify(result)}`);
        if (result.status === 200) {
            return res
                .status(200)
                .json({
                    message: "Items displayItemcontrolleru successfully",
                    status_s: 200,
                    items: result
                });
        } else {
            return res.status(401).json({ message: "Failed to retrieve displayItemcontrolleru" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
const displayItemcontroller = async (req, res) => {
    console.log(`req.query displayItemcontroller 1`);

    try {
        const result = await getItem();
        console.log(`result getitem backend ${JSON.stringify(result)}`);
        if (result.status === 200) {
            return res
                .status(200)
                .json({
                    message: "Items retrieved successfully",
                    status_s: 200,
                    items: result.user.getItem
                });
        } else {
            return res.status(401).json({ message: "Failed to retrieve items" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// const displayItemcontroller = async (req, res) => {
//     console.log(`req.query displayItemcontroller 1`);
 
    
//     try {
//         const result = await getItem();
//         console.log(`result getitem nackend ${JSON.stringify(result)}`)
//         if (result.status === 200) {
//             return res
//                 .status(200)
//                 .json({
//                   message: "Item retrieved successfully",
//                   status_s: 200,
//                   displayItemresult: result
//                 });
//         } else {
//           return res.status(401).json({ message: "Failed to retrieve item" });
//         }
     
//       } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   };
  

 
    const setItemController = async (req, res) => {
       
        const { userId,name,description } = req.body;
        const profilepic = req.file ? req.file.filename : null; 
        console.log(`setItemController ${userId}  ${name}  ${description}  ${profilepic}`)
    
        if (!profilepic) {
            return res.status(400).json({ message: "Image isn't uploaded" });
        }
    
        try {
            const result = await postItem(userId,name,description,profilepic);
            if (result.status === 200) {
                return res.status(200).json({
                    message: "Image uploaded and updated successfully",
                });
            } else {
                return res.status(401).json({ message: "Failed to update profile picture" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };

    
module.exports = {
    setItemController,displayItemcontroller,displayItemcontrolleru,displayItemcontrollerue

}
