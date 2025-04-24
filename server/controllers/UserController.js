import User from "../models/User.js";

//User List
export const userList = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error in fetching users", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//SignIn
export const signInUsers = async (req, res) => {
  const { identifier, password } = req.body;

  // 1. Validate input
  if (!identifier || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Both fields are required" });
  }

  try {
    // 2. Find user by email OR username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    // 3. Check existence & password match
    if (!user || user.password !== password) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // 4. Success—return username
    return res.status(200).json({ success: true, username: user.username });
  } catch (error) {
    console.error("Error in sign-in", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
  
//SignUp
  export const createUser = async (req, res) => {
      const user = req.body;
    
      if(!user.username || !user.email || !user.password){
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
        const user = req.body;
      
        if(!mongoose.Types.ObjectId.isValid(id)){
          return res.status(404).json({success:false, message:"Invalid user ID"});
        }
      
        try{
          const updatedUser = await User.findByIdAndUpdate(id, user, {new:true});
          res.status(200).json({success:true, data: updatedUser});
        }catch(error){
          console.error("Error in updating user", error.message);
          res.status(500).json({success:false, message:"Server Error"});
        }
      }

      //Delete User
      export const deleteUser = async (req, res) =>{
        const {id} = req.params;
        
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({success:false, message:"Invalid user ID"});
          }

        try{
          await User.findByIdAndDelete(id);
          res.status(200).json({success:true, message:"User deleted successfully"});
        }catch(error){
          res.status(500).json({success:false, message:"Server error"});
        }
      }
