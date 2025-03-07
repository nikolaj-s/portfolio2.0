import { signIn } from "next-auth/react";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      username: userInfo.username,
      password: userInfo.password,
    });

    if (result?.error) {
      setError("Invalid username or password.");
    } else {
      router.push("/email"); // Redirect to email page after successful login
    }
  };

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2>Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input 
          type="text" 
          name="username" 
          placeholder="Username" 
          value={userInfo.username}
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={userInfo.password}
          onChange={handleChange} 
          required 
        />
        <button type="submit">Sign In</button>
      </form>
    </motion.div>
  );
};

export default LoginForm;
