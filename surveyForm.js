import React, { Component } from 'react'
//import style from '../components/MyCSSFile/MyStyle.module.css';
import style from '../SurveyForm/MyStyle.module.css'
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie';
import {
    safeRedirect
} from '@mern-starter/helpers/js/helpers';



class SurveyForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Symtoms: {
                fever: false,
                soreThroat: false,
                cough: false,
                diffBreathing: false,
                smellLoss: false,
                bodyAche: false,
            },
            Travel: {
                noTravelHistory: false,
                noAbroadContact: false,
                travelAffected: false,
                contactAffected: false,
            },
           
            Zone: {
                Redzone: false,
                Orangezone: false,
                Greenzone: false,
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }
    changeHandler = (e) => {

        this.setState({ [e.target.name]: e.target.value })
    }
    submitHandler = (e) => {
        e.preventDefault()
        let userID = Cookies.get("userID");
        var myHeaders = new Headers();
        let auth_key = Cookies.get("hms_acct");

        auth_key = "Bearer " + auth_key;
        myHeaders.append("Authorization", auth_key)
        myHeaders.append("Content-Type", "application/json");
        let survey = {
            Symptoms: {
                fever: (this.state.fever !== undefined ? this.state.fever : this.state.Symtoms.fever),
                cough: (this.state.cough !== undefined ? this.state.cough : this.state.Symtoms.cough),
                soreThroat: (this.state.soreThroat !== undefined ? this.state.soreThroat : this.state.Symtoms.soreThroat),
                smellLose: (this.state.smellLose !== undefined ? this.state.smellLose : this.state.Symtoms.smellLose),
                bodyAche: (this.state.bodyAche !== undefined ? this.state.bodyAche : this.state.Symtoms.bodyAche),
                diffBreathing: (this.state.diffBreathing !== undefined ? this.state.diffBreathing : this.state.Symtoms.diffBreathing)
            },
            Zone: {
                Redzone: (this.state.Redzone !== undefined ? this.state.Redzone : this.state.Zone.Redzone),
                Orangezone: (this.state.Orangezone !== undefined ? this.state.Orangezone : this.state.Zone.Orangezone),
                Greenzone: (this.state.Greenzone !== undefined ? this.state.Greenzone : this.state.Zone.Greenzone),
            },
            Travel: {
                noTravelHistory: (this.state.noTravelHistory !== undefined ? this.state.noTravelHistory : this.state.Travel.noTravelHistory),
                noAbroadContact: (this.state.noAbroadContact !== undefined ? this.state.noAbroadContact : this.state.Travel.noAbroadContact),
                travelAffected: (this.state.travelAffected !== undefined ? this.state.travelAffected : this.state.Travel.travelAffected),
                contactAffected: (this.state.contactAffected !== undefined ? this.state.contactAffected : this.state.Travel.contactAffected)
            },
        };

        var raw = JSON.stringify(survey);

        console.log(raw);
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

        alert("Survey Submiited Succesfully ");
        safeRedirect("/profile");


    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
   
    render() {

        return (
            <div >
                <form className={style.root} onSubmit={this.submitHandler}>
                    <div className={style.outer}  >
                        <div className={style.example}>
                            <div className={style.exm}>
                                <h2 >Are you feeling any of the symtoms</h2>
                            </div>

                        </div>


                        <div className={style.exampleInner}>
                            <input
                                className={style.labelInner}
                                name="fever"
                                type="checkbox"
                                value={this.state.Symtoms.fever}
                                onChange={this.handleInputChange} />
                            <label className={style.divInner}>Fever</label>
                        </div>
                        <div className={style.exampleInner}>

                            <input
                                className={style.labelInner}
                                name="cough"
                                type="checkbox"
                                value={this.state.Symtoms.cough}
                                onChange={this.handleInputChange} />
                            <label className={style.divInner}>Cough</label>
                        </div>

                        <div className={style.exampleInner} >
                            <input
                                className={style.labelInner}
                                name="soreThroat"
                                type="checkbox"
                                value={this.state.Symtoms.soreThroat}
                                onChange={this.handleInputChange} />
                            <label className={style.divInner}>Sore Throat</label>
                        </div>
                        <div className={style.exampleInner}>

                            <input
                                className={style.labelInner}
                                name="diffBreathing"
                                type="checkbox"
                                value={this.state.Symtoms.diffBreathing}
                                onChange={this.handleInputChange} />
                            <label className={style.divInner}>Difficulty in Breathing</label>
                        </div>
                        <div className={style.exampleInner}>

                            <input
                                className={style.labelInner}
                                name="bodyAche"
                                type="checkbox"
                                value={this.state.Symtoms.bodyAche}
                                onChange={this.handleInputChange} />
                            <label className={style.divInner}>Body Ache</label>
                        </div>
                        <div className={style.exampleInner}>
                            <input
                                className={style.labelInner}
                                name="smellLoss"
                                type="checkbox"
                                value={this.state.Symtoms.smellLoss}
                                onChange={this.handleInputChange} />
                            <label className={style.divInner}>Smell and taste Loss</label>
                        </div>
                        <div className={style.exampleInner}>
                            <input
                                className={style.labelInner}
                                name="Others"
                                type="checkbox"
                                value={this.state.none}
                                onChange={this.handleInputChange} />
                            <label className={style.divInner}>none</label>
                        </div>
                    </div>



                    <div className={style.outer3}    >
                        <div className={style.example2} >
                            <div className={style.exm2} >
                                <h2 >Zone</h2>
                            </div>
                        </div>

                        <div className={style.exampleInner}>
                            <input
                                className={style.labelInner}
                                type="radio"
                                name="zone"
                                value={this.state.Zone.Redzone}
                                onChange={this.handleInputChange} />
                            <label className={style.divInner}>Red zone</label>
                        </div>
                        <div className={style.exampleInner}>

                            <input
                                className={style.labelInner}
                                type="radio"
                                name="zone"
                                value={this.state.Zone.Orangezone}
                                onChange={this.handleInputChange} />
                            <label className={style.divInner}>Orange zone</label>
                        </div>

                        <div className={style.exampleInner} >
                            <input
                                className={style.labelInner}
                                type="radio"
                                name="zone"
                                value={this.state.Zone.Greenzone}
                                onChange={this.handleInputChange} />
                            <label className={style.divInner}>Green zone</label>
                        </div>

                    </div>






                    <div className={style.outer2}    >
                        <div className={style.example} >
                            <div className={style.exm} >
                                <h2 >Travel and exposure history</h2>
                            </div>

                        </div>


                        <div className={style.exampleInner2}>
                            <input
                                className={style.labelInner}
                                name="noTravelHistory"
                                type="checkbox"
                                value={this.state.Travel.noTravelHistory}
                                onChange={this.handleInputChange} />
                            <label className={style.divInner2}>No travel History</label>
                        </div>
                        <div className={style.exampleInner2}>

                            <input
                                className={style.labelInner}
                                name="noAbroadContact"
                                type="checkbox"
                                value={this.state.Travel.noAbroadContact}
                                onChange={this.handleInputChange} />
                            <label className={style.divInner2}>No contact with anyone from abroad</label>
                        </div>

                        <div className={style.exampleInner2} >
                            <input
                                className={style.labelInner}
                                name="travelAffected"
                                type="checkbox"
                                value={this.state.Travel.travelAffected}
                                onChange={this.handleInputChange} />
                            <label className={style.divInner2}>Traveled in affected area (last 14 days)</label>
                        </div>
                        <div className={style.exampleInner2}>

                            <input
                                className={style.labelInner}
                                name="contactAffected"
                                type="checkbox"
                                value={this.state.Travel.contactAffected}
                                onChange={this.handleInputChange} />
                            <label className={style.divInner2}>Met with someone, affected (last 14 days)</label>
                        </div>
                        <br />
                    </div>
                    





                    
                    <div className={style.btn} >
                        <Button type="submit" variant="contained" color="primary" >Submit</Button>
                    </div>





                </form>
            </div>
        )
    }
}

export default SurveyForm