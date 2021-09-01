import axios from "axios";
import React, { useState, useEffect } from "react";

function UserListingData() {
  const [usersListingData, setUsersListingData] = useState([]);

  useEffect(() => {
    getUsersListing()
  }, []);


  function getUsersListing() {
    return axios.get('http://localhost:9000/users')
    .then(res => {
        console.log("setUsersListingData", res.data)
        setUsersListingData(res.data)
    })
    .catch(err => {
        console.log(err)
    })
  }

  

  return (
    <>
      <select className="form-control" >
        {
          usersListingData.map((item, index) => (
            <option id={item.id} key={index}>{item.userName}</option>
          ))
        }  
      </select>
    </>

  );
}

export default UserListingData;
