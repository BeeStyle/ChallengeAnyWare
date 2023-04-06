import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Joi from 'joi';
export default function Login({ saveUser }) {
    let navigate = useNavigate()
    let [loading, setLoading] = useState(false)
    let [errorList, setErrorList] = useState([])
    let [errorApi, setErrorApi] = useState("")
    let [user, setUser] = useState({
        email: "",
        password: "",
    })
    function addUser(e) {
        let myUser = { ...user }
        myUser[e.target.name] = e.target.value
        setUser(myUser)
    }
    async function submitForm(e) {
        e.preventDefault()
        setLoading(true)
        let valid = validData()
        if (valid.error) {
            setErrorList(valid.error.details);
            setLoading(false);
        } else {
            let { data } = await axios.post('http://localhost:5000/auth/login', user)
            setLoading(false)
            if (data.message === "Done") {
                alert("Login Successful")
                navigate('/')
                let bearer = "GuessIt__"
                localStorage.setItem("token", bearer + data.token)
                saveUser()
            } else {
                setErrorApi(data.message)
            }
        }
    }
    function validData() {
        let scheme = Joi.object({
            email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().required().pattern(new RegExp(/^[A-Za-z\d]{5,32}$/)),
        })
        return scheme.validate(user, { abortEarly: false })
    }
    return (
        <div className="p-5 row justify-content-center">
            <div className="w-50 bg-dark ">
                <div className="py-5 px-5 ">
                    <div className="text-center">
                        <h1 className="h4 mb-4">Log in to AnyWare</h1>
                    </div>
                    <form onSubmit={submitForm}>
                        <input type="email" onChange={addUser} name="email" placeholder="Email Address" required="" className="form-control" />
                        {errorList.length > 0 ? errorList.map((e) => { if (e.path[0] === 'email') { return <div key={e} className='bg-warning'>{e.message}</div> } else { return '' } }) : ''}
                        <input type="password" onChange={addUser} name="password" placeholder="Password" required="" className="form-control mt-3" />
                        {errorList.length > 0 ? errorList.map((e) => { if (e.path[0] === 'password') { return <div key={e} className='bg-warning'>{e.message}</div> } else { return '' } }) : ''}
                        {errorApi === null ? "" : <div className='bg-danger mt-3 text-center'>{errorApi}</div>}
                        {!loading ?
                            <button type="submit" className="btn text-white w-100 py-2 mt-3 btn-primary">
                                <span>Login</span>
                            </button> :
                            <button className="btn text-white w-100 py-2 mt-3">
                                <i className='fa-solid fa-spinner fa-spin'></i>
                            </button>}
                    </form>
                    <hr />
                    <div className="text-center"><button className="small ms-2 text-primary bg-transparent border-0" onClick={() => { alert("Not Implemented Yet Please Create a new account") }}> Forgot Password?</button></div>
                    <div className="text-center">
                        <span className="small">Not a member yet?</span>
                        <Link className="small ms-2 text-primary" to='/register' >Create Account<i className="fas fa-chevron-right small"></i></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
