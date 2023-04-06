import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function History() {
    let [mobilenumberList, setmobilenumberList] = useState([]);
    useEffect(() => {
        getdata()
    }, [])
    async function getdata() {
        let { data } = await axios.get(`http://localhost:5000/searchHistory/getsearchHistory`)
        setmobilenumberList(data.searchHistorys)
    }
    return (
        <div className='mt-5'>
            {mobilenumberList.map(((x, i) =>
                <h3 key={i}>{i+1}-Mobile Number:- {x.mobilenumber}</h3>
            ))
            }
        </div>
    )
}
