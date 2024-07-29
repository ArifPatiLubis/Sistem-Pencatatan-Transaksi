import React, { useState } from 'react'
import { Navigate, Link, NavLink } from 'react-router-dom'
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../firebase/auth'
import { useAuth } from '../../context/authContext'

const Login = () => {

    const { userLoggedIn } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isSigningIn) {
            setIsSigningIn(true)
            await doSignInWithEmailAndPassword(email, password)
            // doSendEmailVerification()
        }
    }

    const onGoogleSignIn = (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            doSignInWithGoogle().catch(err => {
                setIsSigningIn(false)
            })
        }
    }

    return (
        <div className="hold-transition login-page">
        <div className="login-box">
            <div className="card card-outline card-primary">
                <div className="card-header text-center">
                    <NavLink to={"/login"} className="h1"><b>Admin</b>LTE</NavLink>
                </div>
                <div className="card-body">
                    <p className="login-box-msg">Sign in to start your session</p>
                        <form onSubmit={onSubmit}>
                            <div className="input-group mb-3">
                            <input type="email" autoComplete='email' required
                                value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control" placeholder="Email" />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-envelope" />
                                </div>
                            </div>
                            </div>
                            <div className="input-group mb-3">
                            <input type="password" autoComplete='current-password' required value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control" placeholder="Password" />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                <span className="fas fa-lock" />
                                </div>
                            </div>
                            </div>
                            <div className="row">
                            <div className="col">
                                <button   type="submit" disabled={isSigningIn} className="btn btn-primary btn-block">{isSigningIn ? 'Signing In...' : 'Sign In'}</button>
                            </div>
                            {errorMessage && (
                            <span className='text-red-600 font-bold'>{errorMessage}</span> )}
                        </div>
                        </form>
                        <div className="social-auth-links text-center mt-2 mb-3">
                            <NavLink to={'/register'} className="btn btn-block btn-info">Sign up</NavLink>
                            <p className="text-center mt-3 mb-2">Or Choose Another Login Method</p>
                            <a disabled={isSigningIn} onClick={(e) => { onGoogleSignIn(e) }} className="btn btn-block btn-white"><i className="fab fa-google mr-2" /> Sign in with Google
                            </a>
                        </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Login