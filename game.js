import React, {useState} from "react";
import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import { grabAugment, grabSteps } from "./global"; //need to add in the augment for the fighting element of the game
import Gacha from "./gacha";
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
//to store progress


const ATTACK = 50;

//make an instructions page
//make a stats 


export default function Game(){
    const [goal, setGoal] = useState(500); //use the goal for the level threshold
    const [stage, setStage] = useState(1);
    const [attackGoal, setAttack] = useState(goal*stage*ATTACK);
    const [progress, updateProgress] = useState(0);
    const [steps, updateSteps] = useState(null);

    function levelPass(){
        console.log('Updating Progress');
        let current = grabSteps();
        if (current != null){
            updateSteps(current);
            //console.log("attack goal: ", attackGoal);
            //console.log(progress+(steps*ATTACK));
            updateProgress(progress+(steps*ATTACK*grabAugment())); //the amount added to progress; later plus the gacha power-ups
            //console.log(progress, steps);
            if (progress >= attackGoal){
                setStage(stage+1);
                setAttack(goal*stage*ATTACK);
                updateProgress(progress-attackGoal);
                console.log('Level passed! now onto level ', stage);
            }
        }else{
            console.log("Already cashed in.")
        }
    }

    function reset(){ //just for debug --> also add notification pop-up to on-click to confirm reset
        setStage(1);
        setAttack(goal*stage*ATTACK);
        console.log('Reset progress.');
    }

    return (<View style={{margin: 15, alignItems: 'center'}}>
        <Text style={{color: 'red', fontSize: 20, textAlign: 'center'}}>Level {stage}</Text>
        <Progress.Bar progress={progress<=0? 0 : progress/attackGoal} width={200} height={20} color={'red'}/>
        {/* <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{color: 'red', fontSize: 18}}>Trail: {attackGoal}</Text>
            <Text style={{color: 'red', fontSize: 18}}>Progress: {progress}</Text>
        </View> */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Pressable onPress={()=>{levelPass()}}>
                    <Text style={[styles.button, {width: 200, marginBottom: 50}]} >CASH IN</Text>
            </Pressable>
            <Pressable onPress={()=>{Alert.alert('How to Play', 'Start to Walk! Keep your eyes OFF of your screen. When you finish walking, cash in and watch your progress increase.', [
      , {text: 'COOL, THANKS!'}])}}>
                    <Text style={{backgroundColor: 'blue', borderRadius: 5, color: 'white', fontSize: 13, width: 25, height: 25, textAlign: "center"}}>i</Text>
            </Pressable>
        </View>
        <View style={{flexDirection: 'row', fontSize: 17}}>
            <Pressable onPress={()=>{
                    if (goal > 100){
                        setGoal(goal-50);
                    }else{
                        setGoal(100);
                    }
                    setAttack(goal*stage*ATTACK);
                }} style={styles.button}>
                    <Text style={{color: 'white', fontSize: 20}}>-</Text>
                </Pressable>
            <Text style={styles.button}>Step Goal: {goal}</Text>
            <Pressable onPress={()=>{
                setGoal(goal+50);
                setAttack(goal*stage*ATTACK);
                }} style={styles.button}>
                    <Text style={{color: 'white', fontSize: 17}}>+</Text>
            </Pressable>
        </View>
        <Pressable onPress={()=>{Alert.alert('Reset Progress', 'Are you sure you want to reset your progress?', [
      {
        text: 'YES',
        onPress: () => reset(),
      }, {text: 'CANCEL'}])}}>
                <Text style={{color: 'red', textAlign: 'center', fontSize: 15, height: 50, margin: 10, fontWeight: 'bold'}}>RESET</Text>
        </Pressable>
    </View>);
}





const styles = StyleSheet.create({
    button:{
        backgroundColor: 'red',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        margin: 5,
        color: 'white',
        fontSize: 17
    }
  });