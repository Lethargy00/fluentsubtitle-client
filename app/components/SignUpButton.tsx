import React from 'react'
import styles from './SignUpButton.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';

const SignUpButton = () => {
  return (
    <Link href="/register" className={styles.button}> 
        <FontAwesomeIcon icon={faSignIn} className={styles.searchIcon} /> Sign Up
    </Link>
  )
}

export default SignUpButton