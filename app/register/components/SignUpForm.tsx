import Link from 'next/link'
import React from 'react'
import styles from './SignUpForm.module.css'

const SignUpForm = () => {
  return (
    <div className={styles.container}>
        <form action="" className={styles.form}>            
            <h1>Sign up</h1>

            <div className={styles.inputContainer}>
                <input type="text" placeholder='Username' required/>
            </div>

            <div className={styles.inputContainer}>
                <input type="email" placeholder='Email' required/>
            </div>
            
            <div className={styles.inputContainer}>
                <input type="password" placeholder='Password' required/>
            </div>

            <div className={styles.inputContainer}>
                <input type="password" placeholder='Confirm Password' required/>
            </div>
            <div className='flex gap-2'>
                <input type="checkbox" />
                <p>Remember me</p>
            </div>
            <div className={styles.buttonContainer}>
                <Link href='/'>Cancel</Link>
                <button type='submit'>Create</button>
            </div>
        </form>
    </div>
  )
}

export default SignUpForm