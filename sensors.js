import {
    Accelerometer,
    //Barometer,
    //DeviceMotion,
    //Gyroscope,
    //LightSensor,
    Pedometer,
  } from 'expo-sensors';
import {useState, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { updateAugment, updateSteps } from './global';
import { useKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';


let augments = [];



export default function Counter(){
    const [logs, updateLogs] = useState([]); //make an async storage call?
    const [accelerometer, setListener] = useState(null);
    const [{x, y, z}, setData] = useState({x: 0, y:0, z:0});
    const [active, setActive] = useState(false);
    const [currentSteps, setCurrentStepCount] = useState(0);

    useEffect(()=>{
        if (active){
            Pedometer.watchStepCount(result => {
                setCurrentStepCount(result.steps);
            });

        }else{
            enable();
        }
    })


    async function enable(){
        if (await Pedometer.isAvailableAsync()){
            await Pedometer.getPermissionsAsync();
        }

        if (accelerometer == null){
            await Accelerometer.requestPermissionsAsync();
            if ((await Accelerometer.getPermissionsAsync()).granted){
                Accelerometer.setUpdateInterval(16); //taken from Expo Accelerometer documentation page
            }
        }
    }

    function augment(){
        //gets the orientation (analog to it being in a pocket / away instead of being hand-held)
        //returns the % of power strength to advance through the trail
        let aug = 1-(1-Math.abs(y)+Math.abs(x)+Math.abs(z))/3;

        augments.push(aug);

        return aug;
    }

    function recordSteps(){
        setListener(Accelerometer.addListener(setData));
    }

    async function finishSteps(){
        //store the steps - TO TEST LATER
        updateLogs(logs =>([...logs, (new Date(), currentSteps)]));
        
        //reset Accelerometer
        accelerometer && accelerometer.remove();
        console.log(currentSteps);
        updateSteps(currentSteps);
        setCurrentStepCount(0);

        //augment
        const averageAugment = augments.reduce((sum, currentValue) => sum + currentValue, 0) / augments.length;
        updateAugment(averageAugment);
        
    }

    return ( //to include: button to record, and log display (like recordings from LiveCompose) 
        <Pressable onPress={()=>{
            setActive(!active);
            if (active){ //flipped?
                finishSteps();
            }else{
                recordSteps();
                
            }
        }}>
            {active? <View style = {[styles.button, styles.on_pbutton]}>
                <Text style={{fontSize: 20, color: 'white'}}>Steps: {currentSteps}</Text>
                {/* <Text style={{color: 'white'}}>x: {x}</Text>
                <Text style={{color: 'white'}}>y: {y}</Text>
                <Text style={{color: 'white'}}>z: {z}</Text> */}
                <Text style={{fontSize: 15, color: 'white'}}>Speed Augment: {Math.round(augment()*100)}%</Text>
            </View> : 
            <View style = {[styles.button, styles.off_pbutton]}>
                <Text style={{fontSize: 20, color: 'red'}}>Start!</Text>
                </View>}
        </Pressable>
    );
}






function Logs(){ //using the grab logs to display
    
    useEffect(()=>{

    });

    return(<Pressable>

    </Pressable>);
}



const LOGS = 'logs'; //key for async storage

async function storeLogs(logs){
    try{
        const jsonLogs = JSON.stringify(logs);
        await AsyncStorage.setItem(LOGS, jsonLogs);
    }catch (e){
        console.log("unable to save logs: ", e);
    }
}

async function grabLogs(){
    try{
        const jsonLogs = await AsyncStorage.getItem(LOGS);
        return jsonLogs != null ? JSON.parse(jsonValue) : null;
    }catch(e){
        console.log("unable to save logs: ", e);
        return null;
    }
}





const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding:20
    },
    on_pbutton: {
        backgroundColor: 'red',

    },
    off_pbutton: {
        backgroundColor: 'white',
        borderColor: 'red',
        borderWidth: 5,
    }
  });