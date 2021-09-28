import axios from "axios";
import React, { useState, useEffect } from "react";
import { CRow, CCol } from "@coreui/react";

function RewardStats(props) {
  const [goldType, setGoldType] = useState([]);
  const [goldParams, setGoldParams] = useState([]);

  const [silverType, setSilverType] = useState([]);
  const [silverParams, setSilverParams] = useState([]);

  const [bronzeType, setBronzeType] = useState([]);
  const [bronzeParams, setBronzeParams] = useState([]);

  useEffect(() => {
    getCardsData()
  }, [props.selectedUserId]);


  function getCardsData() {
    return axios.get("http://localhost:9000/cardsData")
      .then((res) => {
        console.log("setGoldBadgeState", res.data);
        renderRewardsStatsData(res.data)
      })
      .catch((err) => {
        console.log("Err", err);
      });
  }

  function renderRewardsStatsData(data) {
    console.log("data", data)
    // for (let item of data) {
      for (let i = 0; i <= data.length; i++) {
        if(data[i].userId == props.selectedUserId){
          // alert("hi", data[i].userId)
          setGoldType(data[i].goldType);
          setGoldParams(data[i].goldType.params);

          setSilverType(data[i].silverType);
          setSilverParams(data[i].silverType.params);

          setBronzeType(data[i].bronzeType);
          setBronzeParams(data[i].bronzeType.params);

          console.log("SilverTye", silverType);

        }
      }
      
    // }
    console.log("setUserRewardProfile", data)
  }

  return (
    <>
      <CRow>
        <CCol sm={4} className="">
          <div className="rewardStatsBlockDetail">
            <div className="rewardStatsBlock">
              <div className="rewardImgBlock">
                <img
                  className="StaterewardImg"
                  src={goldType.rewardImg}
                  alt="RewardImg"
                />
              </div>
              <div className="rewardPointsBlock">
                <div className="rewardTotlePoints goldPoints">
                  {goldType.rewardPoints}
                </div>
                <div className="rewardPointBadgeName">
                  {goldType.rewardType}
                </div>
              </div>
            </div>
            <div className="paraNameTagsBlock">
              {goldParams.map((item, index) => (
                <span key={index} className="paraNameTag goldParams">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </CCol>
        <CCol sm={4} className="">
          <div className="rewardStatsBlockDetail">
            <div className="rewardStatsBlock">
              <div className="rewardImgBlock">
                <img
                  className="StaterewardImg"
                  src={silverType.rewardImg}
                  alt="RewardImg"
                />
              </div>
              <div className="rewardPointsBlock">
                <div className="rewardTotlePoints silverPoints">
                  {silverType.rewardPoints}
                </div>
                <div className="rewardPointBadgeName">
                  {silverType.rewardType}
                </div>
              </div>
            </div>
            <div className="paraNameTagsBlock">
              {silverParams.map((item, index) => (
                <span key={index} className="paraNameTag silverParams">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </CCol>
        <CCol sm={4} className="">
          <div className="rewardStatsBlockDetail">
            <div className="rewardStatsBlock">
              <div className="rewardImgBlock">
                <img
                  className="StaterewardImg"
                  src={bronzeType.rewardImg}
                  alt="RewardImg"
                />
              </div>
              <div className="rewardPointsBlock">
                <div className="rewardTotlePoints bronzePoints">
                  {bronzeType.rewardPoints}
                </div>
                <div className="rewardPointBadgeName">
                  {bronzeType.rewardType}
                </div>
              </div>
            </div>
            <div className="paraNameTagsBlock">
              {bronzeParams.map((item, index) => (
                <span key={index} className="paraNameTag bronzeParams">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </CCol>
      </CRow>
    </>
  );
}

export default RewardStats;
