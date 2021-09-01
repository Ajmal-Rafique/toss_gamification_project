import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'


import {
    CRow,
    CCol,
} from '@coreui/react'


function Manager() {
    const [activitNodeApi, setActivitNodeApi] = useState([])
    const [usersNodeApi, setUsersNodeApi] = useState([])


    function getActivitiesData() {
        return axios.get('http://localhost:9000/activites')
        .then(res => {
            console.log("Api node Data", res.data)
            setActivitNodeApi(res.data)
            console.log("setActivitNodeApi", activitNodeApi)
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    function getUsersData() {
        axios.get('http://localhost:9000/users')
        .then(res => {
            console.log("Api node Data", res.data)
            setUsersNodeApi(res.data)
            console.log("setUsersNodeApi", usersNodeApi)
        })
        .catch(err => {
            console.log(err)
        })

    }

    useEffect(()=>{
        getActivitiesData();
        getUsersData();
    }, [])

    return (
        <>
            <h1> Hi Manager </h1>
            
            <CRow>
                <CCol sm={6} className="">
                <div className="form-group">
                    <label htmlFor="dateForActivites">Select Date</label>
                    <input type="date" className="form-control" id="dateForActivites" />
                </div>
                </CCol>
                <CCol sm={6} className="">
                <div className="form-group">
                    <label htmlFor="ActivitiesList">Activities</label>
                    <select className="form-control" id="ActivitiesList">
                    {
                        activitNodeApi.map((item,index) => (
                        <option key={index}>{item.activityName}</option>
                        ))
                    }
                    </select>
                </div>
                </CCol>
            </CRow>
                
                <div className="form-group">
                    <label htmlFor="exampleFormUserList">Users</label>
                    <select className="form-control" id="exampleFormUserList">
                    {
                        usersNodeApi.map((item,index)  => (
                            <option key={index}>{item.userName}</option>
                        ))
                    }
                    </select>
                </div>
                    
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Example textarea</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div>
                    <button type="button" className="btn btn-success"><span className="cil-contrast btn-icon mr-2"></span> Submit</button>
                </div>
        </>
    )
}

export default Manager
