import User from "../models/User.js";

//User List
export const homePage= async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error in fetching users", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const findId = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Replace with your database query
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
  
//SignUp
  export const createUser = async (req, res) => {
      const user = req.body;
    
      if(!user.username || !user.email){
        return  res.status(400).json({success:false, message:"Please fill all fields"});
      }
    
      const newUser = new User(user)
    
      try{
        await newUser.save();
        res.status(201).json({success:true, data: newUser});
      }catch(error){
        console.error("Error in registering new user", error.message);
        res.status(500).json({success:false, message:"Server Error"});
      }
    }

    //Update User
    export const updateUser =  async (req, res) => {
        const {id} = req.params;
        const {username, email} = req.body;
      
        // if(!mongoose.Types.ObjectId.isValid(id)){
        //   return res.status(404).json({success:false, message:"Invalid user ID"});
        // }
      
        try{
          const updatedUser = await User.findByIdAndUpdate(id, {username, email}, {new:true});
          res.status(200).json({success:true, data: updatedUser});
        }catch(error){
          console.error("Error in updating user", error.message);
          res.status(500).json({success:false, message:"Server Error"});
        }
      };

      //Delete User
      export const deleteUser = async (req, res) => {
        try {
          const { id } = req.params;
          const user = await User.findByIdAndDelete(id); // Delete user by ID
          if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
          }
          res.json({ success: true, message: "User deleted successfully" });
        } catch (err) {
          console.error(err);
          res.status(500).json({ success: false, message: "Server error" });
        }
      };
      

      
