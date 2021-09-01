import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './HmsProfile.scss';
import { HmsContext } from '../../../contexts/HmsContext';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';

function HmsProfile(props) {
    // const classes = useStyles();
    const { appStore } = useContext(HmsContext);
    const { userDetails } = appStore || {};

    let Comorbidities ={};
     userDetails.Comorbidity===undefined? Comorbidities ={}:Comorbidities =userDetails.Comorbidity;

    function helper(x){
        if(x==="diabetic"){
            return "Diabetic";
        }
        else if(x==="hypertension"){
            return "HyperTension";
        }
        else if(x==="lung"){
            return "Lung";
        }
        else if(x==="liver"){
            return "Liver";
        }
        else if(x==="heart"){
            return "Heart";
        }
        else if(x==="kidney"){
            return "Kidney";
        }
        else if(x==="asthma"){
            return "Asthma";
        }
        else if(x==="bloodpressure"){
            return "BloodPressure"
        }
        else if(x==="cancer"){
            return "Cancer"
        }
        else if(x==="others"){
            return "Others"
        }
        return "";
    }

    function getComorbidities(obj) {
        var keys = Object.keys(obj);

        var filtered = keys.filter(function (key) {
            return obj[key]
        });

        let a = "";
        filtered.map(function (x) {
            x=helper(x);
            a = x + " " + a;
        })
        return a;
    }
    
    

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}></View>
                <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />

                {/* <Box mb={2} className={ classes.hmsUserDPName}>{ (getDisplayName(userDetails.name))} </Box> */}

                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.name}>{userDetails.name}</Text>
                        <Text style={styles.info}>Reporting Manager: {userDetails.reporting_manager}</Text>
                        <Text style={styles.info}>SAP ID: {userDetails.sap_id}</Text>
                        <Text style={styles.description}>Location: {userDetails.address}</Text>
                        <Text style={styles.description}>Age: {userDetails.age}</Text>
                        {/* <Text style={styles.desc}>Vaccinated with: {userDetails.vaccine}</Text> */}
                        <View style={styles.card}>
                            <Text style={styles.cardTittle}>Your Health Status</Text>
                            <ScrollView endFillColor="#ffff">
                                <Text style={styles.desc}> • Overall status: {userDetails.covidHistory}</Text>
                                <Text style={styles.desc}> • Comorbidities: {getComorbidities(Comorbidities)}</Text>
                                <Text style={styles.desc}> • Vaccination: {userDetails.vaccineDoses}</Text>
                                <Text style={styles.desc}> • Blood Group: {userDetails.blood_group}</Text>
                                <Text style={styles.desc}> • Zone: {userDetails.zone}</Text>
                            </ScrollView>
                        </View>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Link to="/profileupdate">Update Profile</Link>
                        </TouchableOpacity>
                        <Text style={styles.footerInfo}>Last date of survey taken: July 30th 2021 </Text>
                    </View>

                </View>
            </View>
        </ScrollView>
    );

}
const styles = StyleSheet.create({
    header: {
        backgroundColor: "#035F69",
        height: 100,
        width: 2000,
    },
    cardTittle: {
        color: "#808080",
        fontSize: 22,
        marginBottom: 5,
        textAlign: 'center'
    },
    card: {
        backgroundColor: "#035F69",
        borderRadius: 20,
        padding: 10,
        height: 230,
        width: 430,
        marginTop: 5,
        marginBottom: 1,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 40
    },
    // name:{
    //   fontSize:22,
    //   color:"#FFFFFF",
    //   fontWeight:'600',
    // },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 45,
    },
    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600",
        marginTop: -15,
    },
    info: {
        fontSize: 16,
        color: "#035F69",
        marginTop: 1
    },
    footerInfo: {
        fontSize: 16,
        color: "#035F69",
        marginTop: 1,
        marginBottom: -35,
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 6,
        marginBottom: 1,
        textAlign: 'center'
    },
    desc: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        marginBottom: 1,
        backgroundColor: "#ffff",
        textAlign: 'left',
        width: 400,
        height: 30,
        borderRadius: 20,


    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#035F69",
    },
});

export default HmsProfile;