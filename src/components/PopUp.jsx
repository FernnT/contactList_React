import React, { useState } from "react";
import '../App.css';

function PopUp(props) {
    const [lname, setLname] = useState('');
    const [fname, setFname] = useState('');
    const [emailAdd, setEmailAdd] = useState('');
    const [contactNum, setContactNum] = useState('');

    const closePopUp = () => {
        props.popUpActs(true);
    }

    const inputValueChanged = (tags) => (event) => {
        switch (tags) {
            case 'lname':
                setLname(event.target.value);
                break;
            case 'fname':
                setFname(event.target.value);
                break;
            case 'emailAdd':
                setEmailAdd(event.target.value);
                break;
            case 'contactNum':
                setContactNum(event.target.value);
                break;
            default:
                break;
        }
    }

    const formSubmitted = (e) => {
        props.submitContact(lname, fname, emailAdd, contactNum);
        setLname('');
        setFname('');
        setEmailAdd('');
        setContactNum('');
        e.preventDefault();
    }

    return (
        <div style={{ position: 'relative', width: 'inherit', height: 'inherit' }}>
            <div id="transparentGrayBG" onClick={closePopUp}></div>
            <div id="modal">
                <center>
                    <br />
                    <h2 style={{ margin: '0px' }}>Contact</h2><br />
                    <form id="modalForm" onSubmit={(event) => formSubmitted(event)}>
                        <input required maxLength="50" value={lname} name="lname" id="lname"
                            onChange={inputValueChanged("lname")} placeholder="Last name" className="inputFields" /><br />
                        <input required maxLength="50" value={fname} name="fname" id="fname"
                            onChange={inputValueChanged("fname")} placeholder="First name" className="inputFields" /><br />
                        <input required maxLength="50" value={emailAdd} name="emailAdd" id="emailAdd"
                            onChange={inputValueChanged("emailAdd")} type="email" placeholder="Email address" className="inputFields" /><br />
                        <input required maxLength="15" value={contactNum} name="contactNum" id="contactNum"
                            onChange={inputValueChanged("contactNum")} type="tel" placeholder="Contact number" className="inputFields" /><br />
                        <button id="btnName" type="submit">Submit</button>
                    </form>
                </center>
            </div>
        </div>
    );
}

export default PopUp;