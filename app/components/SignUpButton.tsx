import React from 'react'
import style from './SignUpButton.module.css'
import Link from 'next/link'
import { register } from 'module'

const SignUpButton = () => {
  return (
    <div><Link href="/register">Sign Up</Link></div>
  )
}

export default SignUpButton