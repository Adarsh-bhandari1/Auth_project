// This is the first level of the authentication project (encryption and hashing)
// we will use bcrypt to hash the password and the salt will be generated randomly
import React, { useState } from "react";
// use bcryptjs for the browser instead of bcrypt, which has node dependencies
import bcrypt from "bcryptjs";

function L1() {
  const [password, setPassword] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");
  
  const handleHash = () => {
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) console.log(err);
      console.log(hash);
      setHashedPassword(hash);
    });
  };

  return (
    <div>
      <h2>Level 1: Hashing</h2>
      <input 
        type="password" 
        placeholder="Enter the password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleHash}>Hash Password</button>
      {hashedPassword && (
        <div>
          <p>Hashed Result:</p>
          <code>{hashedPassword}</code>
        </div>
      )}
    </div>
  );
}

export default L1;

