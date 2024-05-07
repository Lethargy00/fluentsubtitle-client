import React from "react";
import style from "./SignUpButton.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";

const SignUpButton = () => {
  return (
    <Link href="/register" className={style.button}>
      <FontAwesomeIcon icon={faSignIn} className={style.icon} />
      Sign Up
    </Link>
  );
};

export default SignUpButton;
