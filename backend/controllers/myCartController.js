const {
    deleteMyCart,displayMyCart,addMyCart
} = require("../services/myCartService");
  
const deleteMyCartcontroller = async (req, res) => {
    // console.log(`req.query deleteCartitemcontroller 1`);
    console.log(`deleteMyCartcontroller ${JSON.stringify(req.body)}`)
    const { userId,postID } = req.body;

    try {
        const result = await deleteMyCart(userId,postID);
        console.log(`result getitem backend ${JSON.stringify(result)}`);
        if (result.status === 200) {
            return res
                .status(200)
                .json({
                    message: "Items deleted successfully",
                    status: 200,
                    
                });
        } else {
            return res.status(401).json({ message: "Failed to retrieve items" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


 
    const displayMyCartcontroller = async (req, res) => {
        console.log(`setItemController displayMyCartcontroller req.body${JSON.stringify(req.body)}`)
        // const { userId } = req.body;
        const { userId } = req.query;// Extract userId from the request body
        
        console.log(`setItemController displayMyCartcontroller ${userId}`)
    
    
        try {
            const result = await displayMyCart(userId);
            if (result.status === 200) {
                return res.status(200).json({
                    message: "Item displayed successfully in the cart",
                    status: 200,
                    myCart: result.displayCart
                });
            } else {
                return res.status(401).json({ message: "Failed to update profile picture" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
};
    


const addMyCartcontroller = async (req, res) => {
       
    const { userId,postID } = req.body;
    
    console.log(`setItemController ${userId}  ${postID}`)

   

    try {
        const result = await addMyCart(userId,postID );
        if (result.status === 200) {
            return res.status(200).json({
                message: "Item is added successfully to the cart",
                status:200
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
    displayMyCartcontroller,deleteMyCartcontroller,addMyCartcontroller

}
