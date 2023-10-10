import React, { useState, useEffect } from 'react';
import PopUp from './components/PopUp.jsx';
import $ from 'jquery';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [hidePopUp, setHidePopUp] = useState(true);
  const [operation, setOperation] = useState(0);
  const [contact, setContact] = useState({});

  useEffect(() => {
    fetchData();

  }, []);

  const popUpActs = (val, action = 0) => {
    setHidePopUp(val);
    setOperation(action);
  };

  const editContact = (id) =>{
    popUpActs(false, 1)
    
    
  }

  // const deleteContact = (id) => {
  //   if (window.confirm('Are you sure you want to delete this contact?')) {
  //     $.ajax({
  //       type: 'POST',
  //       url: 'https://todolist-sample.000webhostapp.com/delete.php',
  //       data: "id=" + id,
  //       success: function (response) {
  //         const res = JSON.parse(response);
  //         alert(res["message"]);
  //         if (res["status"] === 200) {
  //           const updatedData = data.filter((item) => item.id !== id);
  //           setData(updatedData);
  //         }
  //       }
  //     });
  //   }
  // };
  const deleteContact = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      const apiUrl = 'http://localhost/contacts/contactlist_react-next/src/php/delete.php';
  
      axios
        .post(apiUrl, `id=${id}`)
        .then((response) => {
          const res = response.data;
          alert(res["message"]);
          if (res["status"] === 200) {
            const updatedData = data.filter((item) => item.id !== id);
            setData(updatedData);
          }
        })
        .catch((error) => {
          console.error('Error deleting contact:', error);
        });
    }
  };

  // const submitContact = (lname, fname, emailAdd, contactNum) => {
  //   popUpActs(true);
  //   const obj = {
  //     lname,
  //     fname,
  //     emailAdd,
  //     contactNum
  //   }
     
  //   const data = new URLSearchParams(obj).toString();
  //   $.ajax({
  //     type: 'POST',
  //     url: 'https://todolist-sample.000webhostapp.com/add.php',
  //     data: data,
  //     success: function (response) {
  //       const res = JSON.parse(response);
  //       alert(res["message"]);
  //       if (res["status"] === 200 && res["data"] !== -1) {
  //         const newObj = {
  //           id: res["data"],
  //           lastName: lname,
  //           firstName: fname,
  //           email: emailAdd,
  //           number: contactNum
  //         }
  //         const updatedData = [...data, newObj];
  //         setData(updatedData);
  //       }
  //     }
  //   });
  // };

  const submitContact = (lname, fname, emailAdd, contactNum) => {
    popUpActs(true);
    const obj = {
      lname,
      fname,
      emailAdd,
      contactNum
    };
  
    const data = new URLSearchParams(obj).toString();
    const apiUrl = 'http://localhost/contacts/contactlist_react-next/src/php/add.php';
  
    axios
      .post(apiUrl, data)
      .then((response) => {
        const res = response.data;
        alert(res["message"]);
        if (res["status"] === 200 && res["data"] !== -1) {
          const newObj = {
            id: res["data"],
            lastName: lname,
            firstName: fname,
            email: emailAdd,
            number: contactNum
          };
          const updatedData = [...data, newObj];
          setData(updatedData);
        }
      })
      .catch((error) => {
        console.error('Error submitting contact:', error);
      });
  };

  // const fetchData = () => {
  //   $.ajax({
  //     type: 'GET',
  //     url: 'https://todolist-sample.000webhostapp.com/read.php',
  //     success: function (response) {
  //       const contactsData = JSON.parse(response);
  //       const arr = [];
  //       for (let x = 0; x < contactsData.count; x++) {
  //         arr.push(contactsData.data[x]);
  //       }
  //       setData(arr);
  //     }
  //   });
  // };

  const fetchData = () => {
    const apiUrl = "http://localhost/contacts/contactlist_react-next/src/php/read.php"

    axios
    .get(apiUrl)
    .then((response) => {
      const contactsData = response.data;
      const arr = [];
      for (let x = 0; x < contactsData.count; x++) {
        arr.push(contactsData.data[x]);
      }
      setData(arr);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      })



 }




  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div id="contactList" style={{ width: '100%', position: 'absolute' }}>
        <center><h1>Contact List</h1></center>
        <table id="contactTable" border="1" style={{ width: '100%', border: '1px solid black' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>LAST NAME</th>
              <th>FIRST NAME</th>
              <th>EMAIL ADDRESS</th>
              <th>CONTACT NUMBER</th>
              <th style={{ width: '100px' }}></th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.lastName}</td>
                    <td>{item.firstName}</td>
                    <td>{item.email}</td>
                    <td>{item.number}</td>
                    <td>
                      <button style={{ backgroundColor: 'green' }} className='actionButtons' onClick={() => editContact(item.id)}>EDIT</button>
                      <button style={{ backgroundColor: 'red' }} className='actionButtons' onClick={() => deleteContact(item.id)}>DELETE</button>
                      
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        <br />
        <button style={{ float: 'right', fontSize: '16px' }} onClick={() => popUpActs(false, 1)}>ADD CONTACT</button>
        <br /><br />
      </div>
      <div hidden={hidePopUp} id="addContactPopup" style={{ width: '100%', height: '100vh', position: 'absolute' }}>
        <PopUp popUpActs={popUpActs} submitContact={submitContact} />
      </div>
    </div>
  );
}

export default App;
