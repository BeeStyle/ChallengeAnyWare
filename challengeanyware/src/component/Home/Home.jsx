import Joi from 'joi'
import React, { useState } from 'react'
import './home.css'
import axios from 'axios'

export default function Home() {
    let [mobilenumberP, setmobilenumber] = useState({
        mobilenumber: ""
    })
    let [loading, setLoading] = useState(false)
    let [error, setError] = useState([])
    let [data, setData] = useState([])
    function addmobilenumber(e) {
        setmobilenumber({ mobilenumber: e.target.value })
    }
    async function submitSearch(e) {
        e.preventDefault()
        setLoading(true)
        let valid = validData()
        if (valid.error) {
            setError(valid.error);
            setLoading(false);
        } else {
            let { data } = await axios.post('http://localhost:5000/searchHistory/', mobilenumberP)
            setLoading(false)
            if (data.message === "Done") {
                setData(data.data)
            } else {
                setError(data.message)
            }
        }
    }
    function validData() {
        let scheme = Joi.object({
            mobilenumber: Joi.string().min(5).max(25).required(),
        })
        return scheme.validate(mobilenumberP)
    }
    return (<>
        <form className="main-search-input-wrap" onSubmit={submitSearch}>
            <div className="main-search-input fl-wrap mb-3">
                <div className="main-search-input-item">
                    <input type="text" placeholder="Search" onChange={addmobilenumber} />
                </div>
                {!loading ? <button type='Submit' className="main-search-button">Search</button> : <button className="main-search-button disabled"><i className='fa-solid fa-spinner fa-spin'></i></button>}
            </div>
            {error.length === 0 ? '' : <div className='alert alert-danger errormsg'>Please Enter a Number in between 5 and 25 digits only</div>}
        </form>
        <div className='clearfix'></div>
        {data.number ? <div className='d-block pt-5 mt-5'>
            <h3>carrier :- {data.carrier}</h3>
            <h3>Country  Code :- {data.country_code}</h3>
            <h3>Country Name :- {data.country_name}</h3>
            <h3>Prefix :- {data.country_prefix}</h3>
            <h3>Internation Format :- {data.international_format}</h3>
            <h3>LineType :- {data.line_type}</h3>
            <h3>Local Format :- {data.local_format}</h3>
            <h3>Location :- {data.location}</h3>
            <h3>Number :- {data.number}</h3>
            <h3>Valid :- {data.valid ? "True" : "False"}</h3>
        </div> : ""}
    </>
    )
}
