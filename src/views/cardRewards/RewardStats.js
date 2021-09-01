import axios from "axios";
import React, { useState, useEffect } from "react";
import { CRow, CCol } from "@coreui/react";

function RewardStats() {
  const [goldType, setGoldType] = useState([]);
  const [goldParams, setGoldParams] = useState([]);

  const [silverType, setSilverType] = useState([]);
  const [silverParams, setSilverParams] = useState([]);

  const [bronzeType, setBronzeType] = useState([]);
  const [bronzeParams, setBronzeParams] = useState([]);

  useEffect(() => {
    getCardsData()
  }, []);


  function getCardsData() {
    return axios.get("http://localhost:9000/cardsData")
      .then((res) => {
        console.log("setGoldBadgeState", res.data);
        setGoldType(res.data.goldType);
        setGoldParams(res.data.goldType.params);

        setSilverType(res.data.silverType);
        setSilverParams(res.data.silverType.params);

        setBronzeType(res.data.bronzeType);
        setBronzeParams(res.data.bronzeType.params);

        console.log("SilverTye", silverType);
      })
      .catch((err) => {
        console.log("Err", err);
      });
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
