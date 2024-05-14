import Link from "next/link";
import React from "react";
import style from "./SignUpForm.module.css";

const SignUpForm = () => {
  return (
    <div className={style.container}>
      <form action="" className={style.form}>
        <h1>Sign up</h1>

        <div className={style.inputContainer}>
          <input type="text" placeholder="Username" required />
        </div>

        <div className={style.inputContainer}>
          <input type="email" placeholder="Email" required />
        </div>

        <div className={style.inputContainer}>
          <input type="password" placeholder="Password" required />
        </div>

        <div className={style.inputContainer}>
          <input type="password" placeholder="Confirm Password" required />
        </div>
        <div className="flex gap-2">
          <input type="checkbox" />
          <p>Remember me</p>
        </div>
        <div className={style.buttonContainer}>
          <Link href="/">Cancel</Link>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
