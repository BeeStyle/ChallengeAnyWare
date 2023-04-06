import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Joi from 'joi';
export default function Register() {
    let [user, setUser] = useState({
        email: "",
        password: ""
    })
    let [loading, setLoading] = useState(false)
    let [errorList, setErrorList] = useState([])
    let navigate = useNavigate()
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
            setErrorList(valid.error.details)
            setLoading(false);
        } else {
            let { data } = await axios.post('http://localhost:5000/auth/signup', user)
            setLoading(false)
            if (data.message === "Done") {
                alert("Registeration Successful")
                navigate('/login')
            }
            else {
                setErrorList(data.message)
            }
        }
    }

    function validData() {
        let scheme = Joi.object({
            email: Joi.string().required().email({ tlds: { allow: false } }),
            password: Joi.string().required().pattern(new RegExp(/^[A-Za-z\d]{5,32}$/))
        })
        return scheme.validate(user, { abortEarly: false })
    }
    return (
        <div className="row p-5 justify-content-center">
            <div className="col-lg-6 bg-dark">
                <div className="py-5 px-5">
                    <div className="text-center">
                        <h1 className="h4 mb-4">Create My Account!</h1>
                    </div>
                    <form onSubmit={submitForm}>
                        <input type="email" onChange={addUser} name="email" placeholder="Email Address" required="" className="form-control" />
                        {errorList.length > 0 ? errorList.map((e) => { if (e.path[0] === 'email') { return <div key={e} className='bg-warning'>{e.message}</div> } else { return '' } }) : ''}
                        <input type="password" onChange={addUser} name="password" placeholder="Password" required="" className="form-control mt-3" />
                        {errorList.length > 0 ? errorList.map((e) => { if (e.path[0] === 'password') { return <div key={e} className='bg-warning'>{e.message}</div> } else { return '' } }) : ''}
                        {!loading ?
                            <button type="submit" className="btn text-white w-100 py-2 mt-3 btn-primary">
                                <span>Create Account</span>
                            </button> :
                            <button className="btn text-white w-100 py-2 mt-3">
                                <i className='fa-solid fa-spinner fa-spin'></i>
                            </button>}
                    </form>
                    <hr />
                    <div className="text-center">
                        <span className="small">Already a member?</span>
                        <Link className="small ms-2 text-primary" to='/login' >Log In<i className="fas fa-chevron-right small"></i></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}