import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie';
import muiCommonStyles from '@mern-starter/helpers/js/muiCommonStyles';
import './HmsProfileUpdate.scss';
import { HmsPaper } from '../../HmsMuiComponents';
import { HmsContext } from '../../../contexts/HmsContext';
// import UiApiUtils from '@mern-starter/ui-swaggergen-utils';
import {
  envUrlandPort,
  safeRedirect
} from '@mern-starter/helpers/js/helpers';
import { MenuItem } from '@material-ui/core';

import ReactDOM from "react-dom";
import { default as ReactSelect } from "react-select";
import { not } from 'joi';
import { underline } from 'chalk';
import { styles } from 'ansi-colors';

// API URLs
// const apiUrl = envUrlandPort.app.api;
// Init API util
// const uiApiUtils = new UiApiUtils({
//     domain: apiUrl
// });
const genders = [
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'female',
    label: 'Female',
  },
  {
    value: 'others',
    label: 'Others',
  }

];
const vaccination = [
  {
    value: 'onedose',
    label: 'First Dose',

  },
  {
    value: 'twodose',
    label: 'Fully Vaccinated',
  },
  {
    value: 'nodose',
    label: 'Not Vaccinated',
  }
];
const Comorbidities = [
  { value: "diabetic", label: "Diabetic" },
  { value: "bloodpressure", label: "BloodPressure" },
  { value: "cancer", label: "Cancer" },
  { value: "heart", label: "Heart" },
  { value: "liver", label: "Liver" },
  { value: "lung", label: "Lung" },
  { value: "kidney", label: "Kidney" },
  { value: "asthma", label: "Asthma" },
  { value: "hypertension", label: "HyperTension" },
  { value: "others", label: "Others" }
];


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '80ch',
    },
  },

}));

export default function HmsProfileUpdate() {

  const { appStore } = useContext(HmsContext);
  const { userDetails } = appStore || {};
  const classes = useStyles();
  const commonClasses = muiCommonStyles();

  // const [gender, setGender] = React.useState('EUR');
  const [contact, setContact] = React.useState({
    username: "",
    email: "",
    phone: "",
    age: "",
    reporting_manager: "",
    sap_id: "",
    location: "",
    blood_group: "",
    gender: "",                         //new
    vaccination: "",                        //new
    Comorbidities: "",                      //new
    Date: "",                                ///new
  });
  //react state for name content of
  // const handleChange1 = (event) => {
  //   setContact(event.target.value);
  // };
  const handleChange1 = (selected) => {
    this.setState({
      optionSelected: selected
    });
  };

  function handleChange(event) {
    const { name, value } = event.target;

    setContact((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });

  }
  function clean(obj) {
    for (var propName in obj) {
      if (obj[propName] === "" || obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(contact)
    const user = {
      name: contact.username,
      email: contact.email,
      sap_id: contact.sap_id,
      phone_number: contact.phone,
      age: contact.age,
      reporting_manager: contact.reporting_manager,
      address: contact.location,
      blood_group: contact.blood_group,
      vaccination: contact.vaccination,                 //new
      gender: contact.gender,                            //new
      Comorbidities: contact.Comorbidities,             //new
      Date: contact.Date                                //new

    };
    clean(user);


    const userID = userDetails._id;

    let myHeaders = new Headers();
    // console.log(Cookies.get("hms_acct"));
    let auth_key = Cookies.get("hms_acct");
    auth_key = "Bearer " + auth_key;
    // console.log(auth_key);
    myHeaders.append("Authorization", auth_key);
    myHeaders.append("Content-Type", "application/json");


    var raw = JSON.stringify(user);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    var url = "http://localhost:4000/employeeInfo/" + userID;

    fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    setContact({
      username: "",
      email: "",
      phone: "",
      age: "",
      reporting_manager: "",
      sap_id: "",
      location: "",
      blood_group: "",
      vaccination: "",              //new
      gender: "",                    //new
      Comorbidities: "",             //new
      Date: "",                     //new

    })
    alert("Details updated Succesfully ");
    safeRedirect("/profile");


  };

  return (

    <HmsPaper>
      <form

        className={classes.root}
        name="hms-survey-form"
        autoComplete="off"
        noValidate
        onSubmit={handleOnSubmit}
      >
        <div>
          <TextField required id="standard-required" name="username" label="Name" onChange={handleChange} value={contact.username} />
          <br />
          <TextField required id="standard-required" name="email" label="Email" onChange={handleChange} value={contact.email} />
          <br />
          <TextField name="sap_id" label="SAP ID" onChange={handleChange} value={contact.sap_id} />
          <br />
          <TextField name="phone" label="Phone Number" onChange={handleChange} value={contact.phone} />
          <br />
          <TextField name="reporting_manager" label="Reporting Manager" onChange={handleChange} value={contact.reporting_manager} />
          <br />
          <TextField name="age" label="Age" onChange={handleChange} value={contact.age} />
          <br />
          <TextField name="location" label="Location" onChange={handleChange} value={contact.location} />
          <br />
          <TextField name="blood_group" label="Blood Group" onChange={handleChange} value={contact.blood_group} />
          <br />


          <TextField

            select
            label="Gender"
            name="gender"
            value={contact.gender}
            onChange={handleChange}
          >
            {genders.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <br />


          <TextField

            select
            label="Vaccination"
            name="vaccination"
            value={contact.vaccination}
            onChange={handleChange}
          >
            {vaccination.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}

          </TextField>

          <br />

          <TextField name="Date" type="date" label="Date of vaccination(optional)" onChange={handleChange} value={contact.Date} InputLabelProps={{shrink:true,}} />

          <br />

          <br />

          <ReactSelect

            styles={{
              control: (provided, state) => ({
                ...provided,
                boxShadow: "none",
                border: "none",
                paddingLeft: "7px",
                fontSize: 16,
              }),

            }}
            placeholder=" Comorbidities"
            name="comorbidities"
            value={contact.comorbidities}
            options={Comorbidities}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            //  onChange={this.handleChange1}
            allowSelectAll={true}

          />

          <br />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            className={commonClasses.loginButton}
          >
            Update your profile
          </Button>

        </div>
      </form>
    </HmsPaper>

  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<HmsProfileUpdate />, rootElement);





