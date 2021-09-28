import React, {useEffect, useState} from 'react'
import {
  CCol,
  CRow,
  CContainer
} from '@coreui/react'
import axios from 'axios'
import RewardCards from '../cardRewards/RewardStats'
import UserListingData from '../users/usersListing'

function Dashboard() {
  const [userRewardProfile, setUserRewardProfile] = useState([])
  const [profileDetailUser, setProfileDetailUser] = useState([])
  const [totalRewardsDetail, setTotalRewardsDetail] = useState([])
  const [overAllEarnReward, setOverAllEarnReward] = useState([])
  const [durationTotalRewards, setDurationTotalRewards] = useState([])
  const [selectedUser, setSelectedUser] = useState('Muhammad Ajmal Rafique')
  const [selectedUserId, setSelectedUserId] = useState(1)

  function getRewardsData (id) {
    return axios.get('http://localhost:9000/userProfile/'+id)
      .then(res => {
        renderRewardsData(res.data);        
      })
      .catch(err => {
        console.log(err)
      })
  }

  function renderRewardsData(data) {
    console.log("data", data)
    // for (let item of data) {
      for (let i = 0; i <= data.length; i++) {
        if(data[i].userId == selectedUserId){
          // alert("hi", data[i].userId)
          setUserRewardProfile(data[i])
          setProfileDetailUser(data[i].profileDetail)
          setTotalRewardsDetail(data[i].totalRewardsDetail)
          setOverAllEarnReward(data[i].overAllEarnReward)
          setDurationTotalRewards(data[i].durationTotalRewards)
          console.log("userRewardProfile", userRewardProfile)
        }
      }
      
    // }
    console.log("setUserRewardProfile", data)
  }

  function updatedUserFun(optionEle) {
    setSelectedUser(optionEle.innerText)
    var optnEleId =  optionEle.getAttribute('id');
    selectedUserIdFun(optnEleId)
    // console.log("ele", optionEle)
    // const url= 'http://localhost:9000/userProfile/'+{selectedUserId};
    getRewardsData(selectedUserId)
  }

 function selectedUserIdFun(id) {
  setSelectedUserId(id);
 }

  

  useEffect(() => {
    getRewardsData(selectedUserId);
  }, [selectedUserId])

  return (
      <>
      <div className="containerProfileRewards marginBtm15px">
        <CRow>
          <CCol>
            <div className="float-right">
              <UserListingData updatedUser={updatedUserFun} userName={selectedUser}/>
            </div>
          </CCol>
        </CRow>
      </div>
      <div className="docs-example-row">
        <CContainer className="containerProfileRewards">
          <CRow>
            <CCol sm={4}>
              <div className="containerProfileRewards">
                <div className="outerProfileRewardsBlock">
                  <div className="profileImgBlock">
                    <img
                      src={profileDetailUser.userImg}
                      className="profileImg"
                    />
                  </div>
                  <div className="totlePointsBlock">
                    <p>{totalRewardsDetail.totalPointsEarned} / {totalRewardsDetail.totalPoints} <span className="textClrBlue">Points</span></p>
                  </div>
                  <div className="rewardsBlockPoints">
                    <div className="goldPointBlock"><p className="PointsMargin">{totalRewardsDetail.totalGoldPoints}</p></div>
                    <div className="silverPointBlock"><p className="PointsMargin">{totalRewardsDetail.totalSilverPoints}</p></div>
                    <div className="bronzePointBlock"><p className="PointsMargin">{totalRewardsDetail.totalBronzePoints}</p></div>
                  </div>
                </div>
                {/* <div>{selectedUser}</div> */}
              </div>
              
            </CCol>
            <CCol sm={5}>
              <h4>{profileDetailUser.userName}</h4>
              <p className="devDesignation">{profileDetailUser.userDesignation}</p>
              
              <div className='MainRewardBlock'>
                
                <div className="overAllRewardEarned">
                  <div className='parentRewardBlock'>
                    <div className='childRewardBlock'>
                      <img className="imgInsideReward" src={overAllEarnReward.overAllEarnBadgeImg} alt='RewardImg' />
                    </div>
                  </div>
                </div>
                  
                <div className="overAllPointsEarned">
                  <div className="pointsEarned">{overAllEarnReward.overAllEarnPoints}</div>
                  <div className="badgeNameEarned">{overAllEarnReward.overAllEarnBadgeName}</div>
                </div>
                <div style={{display:'inline-block', marginTop:'15px'}}>
                  <span style={{fontWeight:500, fontSize:'18px'}}>I'm</span> {profileDetailUser.userAbout}
                </div>

              </div>
            </CCol>
            <CCol sm={3}>
              <div className="rewardsDurationBlock">
                <h5 className="durationTitle">In TEO Since</h5>
                <div className="rewardsDuration">{userRewardProfile.totalRewardsDuration}</div>
              </div>
              <div className="paraRedAreaBlock">
                <p className="improvementAreasTitle">Improvement Areas</p>
                {durationTotalRewards.map((item, index) => (
                  <div className="redAreaParameters" key={index}>{item}</div>
                ))}
                
              </div>
              
            </CCol>
          </CRow>
        </CContainer>
      </div>

      {/* <h4>Weekly Rewards Stats</h4> */}
      <CContainer className="rewardStatsContainer">
        <RewardCards selectedUserId={selectedUserId} />
      </CContainer>
    </>
  )
}

export default Dashboard



// const Dashboard = () => {
//   return (
    
//   )
// }

// export default Dashboard
