import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { CRow, CCol } from '@coreui/react'
// import { func } from 'prop-types'

function Manager() {
    const [activityNodeApi, setActivityNodeApi] = useState([])
    const [usersNodeApi, setUsersNodeApi] = useState([])
    const [activityData, setActivityData] = useState({
        curDate: '',
        curActivityPoint: '',
        curUserId: '',
        descActivity: ''
    });

    function getActivitiesData() {
        return axios.get('http://localhost:9000/activites')
        .then(res => {
            console.log("Api node Data", res.data)
            setActivityNodeApi(res.data)
            console.log("setActivityNodeApi", activityNodeApi)
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

    function handleChange(e) {
        const newActivityData = {...activityData}
        newActivityData[e.target.id] = e.target.value
        setActivityData(newActivityData);
        console.log(newActivityData)
    }

    function handleUserId(e) {
        const index = e.target.selectedIndex
        const optionElement = e.target.childNodes[index]
        const selectedUserId = optionElement.getAttribute('id')
        setActivityData( {...activityData, curUserId: selectedUserId} )
    }

    function handleActivityPoints(e) {
        var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index]
        var activityPoints =  optionElement.getAttribute('points');
        // setActivityData(activityData => ({ ...activityData, curActivityPoint: activityPoints}));
        setActivityData({...activityData, curActivityPoint: activityPoints})
        console.log("activityData", activityData)
    }

    
    function submit(e) {
        e.preventDefault();
        // POST request using axios inside useEffect React hook
        const article = { id: activityData.curUserId, points:activityData.curActivityPoint }
        // const article = {
        //     "userId":activityData.curUserId,
        //     "totalRewardsDuration":"9Years 11Months",
        //     "profileDetail":{
        //         "userName":"Jennifer Lopez",
        //         "userAbout":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        //         "userDesignation":"Staff Engineer",
        //         "userImg":"./images/jen.jpg"
        //     },
        //     "totalRewardsDetail":{
        //         "totalPoints":57070,
        //         "totalPointsEarned":activityData.curActivityPoint,
        //         "totalGoldPoints":4050,
        //         "totalSilverPoints":5074,
        //         "totalBronzePoints":3846
        //     },
        //     "overAllEarnReward":{
        //         "overAllEarnPoints":activityData.curActivityPoint,
        //         "overAllEarnBadgeName":"Gold Badge",
        //         "overAllEarnBadgeImg":"./images/reward_gold.png"
        //     },
        //     "durationTotalRewards":[
        //         "Timesheet Submission","weeklyHours","Check-out","Initiatives"
        //     ]
        // }
        axios.put('http://localhost:9000/userProfile', article)
        .then(res => {
            console.log(`response for post", ${res.data}`)
            alert("successfully added Points!")
        })
        .catch(err =>{
            console.log(`Post method Erro, ${err}`);
        })
        // alert("onSbmt")
        console.log("setActivityData", activityData);
    }

    useEffect(()=>{
        getActivitiesData();
        getUsersData();
    }, [activityData])

    return (
        <>
            <h1> Hi Manager </h1>
            
            <CRow>
                <CCol sm={6} className="">
                <div className="form-group">
                    <label htmlFor="curDate">Select Date</label>
                    <input onChange={(e) => handleChange(e) } value={activityData.curDate} id="curDate" className="form-control" type="date" />
                </div>
                </CCol>
                <CCol sm={6} className="">
                <div className="form-group">
                    <label htmlFor="ActivitiesList">Activities</label>
                    <select className="form-control" id="ActivitiesList" onChange={(e) => handleActivityPoints(e) }>
                    {
                        activityNodeApi.map((item,index) => (
                        <option id={item.id} points={item.points} key={index}>{item.activityName}</option>
                        ))
                    }
                    </select>
                </div>
                </CCol>
            </CRow>

            <CRow>
                <CCol sm={12} className="">    
                <div className="form-group">
                    <label htmlFor="activityUserName">Users</label>
                    <select onChange={(e) => handleUserId(e)} className="form-control" id="activityUserName">
                    {
                        usersNodeApi.map((item,index)  => (
                            <option id={item.id} key={index}>{item.userName}</option>
                        ))
                    }
                    </select>
                </div>
                </CCol>
            </CRow>

            <CRow>
                <CCol sm={12} className="">        
                <div className="form-group">
                    <label htmlFor="descActivity">Example textarea</label>
                    <textarea onChange={(e) => handleChange(e) } value={activityData.descActivity} className="form-control" id="descActivity" rows="3"></textarea>
                </div>
                <div>
                    <button onClick={submit} type="button" className="btn btn-success"><span className="cil-contrast btn-icon mr-2"></span> Submit</button>
                </div>
                </CCol>
            </CRow>
        </>
    )
}

export default Manager
