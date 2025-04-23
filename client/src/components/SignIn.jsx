import { useState } from "react";

const SignIn = () => {
    const [email, setEmail] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleAddUser = () =>{
        console.log(email);
       
    }

    return( 
    <div>
        <h2>SignIn</h2>
        <input type='text' placeholder='Username' value={email.username} onChange={(e) => setEmail({...email, username: e.target.value})} />
        <input type='text' placeholder='Email' value={email.email} onChange={(e) => setEmail({...email, email: e.target.value})} />
        <input type='password' placeholder='Password' value={email.password} onChange={(e) => setEmail({...email, password: e.target.value})} />
        <button onClick={() => console.log(email)}>Sign In</button>
    </div>
    );
}

export default SignIn;