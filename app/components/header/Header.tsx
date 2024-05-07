import Link from "next/link";
import Image from "next/image";
import React from "react";
import style from "./Header.module.css";
import SignUpButton from "../SignUpButton";
import SetTheme from "../SetTheme";

const header = () => {
  return (
    <header className={style.header}>
      <Link href="/" className={style.link}>
        <Image
          className={style.image}
          src="/favicon.ico"
          width={80}
          height={80}
          alt="FluentSubtitle Logo"
        />
        <span className={style.text}>FluentSubtitle</span>
      </Link>
      <SetTheme />
      <SignUpButton />
    </header>
  );
};

export default header;
