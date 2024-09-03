const {
    setProfile,getProfile
} = require("../services/setprofileServices");
  

const displayprofilecontroller = async (req, res) => {
    console.log(`req.query displayprofilecontroller ${JSON.stringify(req.query)}`);
    const { userId } = req.query;
   
    console.log(`displayprofilecontroller userId ${userId}`);
    
    try {
        const result = await getProfile(userId);
        if (result.status === 200) {
            return res
                .status(200)
                .json({
                  message: "Item retrieved successfully",
                  status_s: 200,
                  profilePic: result.user.profilePic
                });
        } else {
          return res.status(401).json({ message: "Failed to retrieve item" });
        }
     
      } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  

 
    const setProfileController = async (req, res) => {
        console.log(`Request body: ${JSON.stringify(req.body)}`);
        console.log(`File information: ${JSON.stringify(req.file)}`);
    
        const { userId } = req.body;
        const profilepic = req.file ? req.file.filename : null;
    
        if (!profilepic) {
            return res.status(400).json({ message: "Image isn't uploaded" });
        }
    
        try {
            const result = await setProfile(userId, profilepic);
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
    setProfileController,displayprofilecontroller

}
