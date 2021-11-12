import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./navbar.module.css";

const NavBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/">
          <a className={styles.logoLink}>
            <div className={styles.logoWrapper}>
              <Image
                src="/static/logo.svg"
                alt="Logo"
                width="228px"
                height="34px"
              />
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
