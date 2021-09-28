import axios from "axios";
import React, { useState, useEffect } from "react";

function UserListingData(props) {
  const [usersListingData, setUsersListingData] = useState([]);
  // const [value, setValue] = useState();

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

  const selectedUser = (user) => {
    // props.updatedUser(user.target.value)
    var index = user.target.selectedIndex;
    var optionElement = user.target.childNodes[index]
    // var option =  optionElement.getAttribute('id');
    props.updatedUser(optionElement)
  }

  return (
    <>
      {/* <select className="form-control" onChange={e => selectedUser(e.currentTarget.value)} > */}
      <select className="form-control" onChange={selectedUser} value={props.userName} >
      
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
