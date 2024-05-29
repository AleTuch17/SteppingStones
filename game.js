import React, {useState} from "react";
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { grabAugment, grabSteps } from "./global";

const ATTACK = 50;

//PROGRESS / STEPS NOT WORKINGGGGGG

export default function Game(){
    const [goal, setGoal] = useState(500); //use the goal for the level threshold
    const [stage, setStage] = useState(1);
    const [attackGoal, setAttack] = useState(goal*stage*ATTACK);
    const [progress, updateProgress] = useState(0);
    const [steps, updateSteps] = useState(grabSteps());

    function levelPass(){
        console.log('Updating Progress');
        let current = grabSteps();
        if (current != null){
            updateSteps(current);
            console.log("attack goal: ", attackGoal);
            console.log(progress+(steps*ATTACK));
            updateProgress(progress+(steps*ATTACK)); //the amount added to progress; later plus the gacha power-ups
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

    return (<View style={{margin: 15}}>
        <Text style={{color: 'red', fontSize: 20, textAlign: 'center'}}>Level: {stage}</Text>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{color: 'red', fontSize: 18}}>Trail: {attackGoal}</Text>
            <Text style={{color: 'red', fontSize: 18}}>Progress: {progress}</Text>
        </View>
        <Pressable onPress={()=>{levelPass()}}>
                <Text style={styles.button} >CASH IN</Text>
        </Pressable>
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
        <Pressable onPress={()=>{reset()}}>
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