import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as DeviceCalendar from 'expo-calendar';
import * as Device from 'expo-device';

const DEVICE = Device.osName;
const DATE = new Date();

//https://github.com/software-mansion/react-native-gesture-handler/blob/main/example/src/new_api/reanimated/index.tsx

function Mailbox(){ //see inbox & read unread emails for rewards, compose emails
    const open = Gesture.Tap(); //emptying the mail

    return (
        <GestureHandlerRootView>
            <GestureDetector gesture={open}>
                <View style={styles.container}>
                    
                </View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
}

function CallReceiver(){ //see voicemails for rewards
    const open = Gesture.Fling(); //if animations work, get a corded phone two-piece icon where the user can lift the phone off of the reciever...

    return (
        <GestureHandlerRootView>
            <GestureDetector gesture={open}>
                <View style={styles.container}>
                    
                </View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
}

function MessageReceiver(){ //see unread messages for rewards
    const open = Gesture.LongPress(); //on the same phone icon
    
    return (
        <GestureHandlerRootView>
            <GestureDetector gesture={open}>
                <View style={styles.container}>
                    
                </View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
}

function Notepad(){ //complete to-dos & reminders for rewards
    const open = Gesture.Pinch(); //zoom in to look at the paper? 

    return (
        <GestureHandlerRootView>
            <GestureDetector gesture={open}>
                <View style={styles.container}>
                    
                </View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
}

export function Stickies(){ 

    const open = Gesture.LongPress().onStart(async ()=>{
    
        //double check Expo documentation for reminder type and permissions
        const { status } = await DeviceCalendar.requestCalendarPermissionsAsync(); 
        if (status === 'granted') {

            //get Reminders from specific calendars id

        } else{
            console.log("Reminder fetch failed.");
        }
    });

    return (
        <GestureHandlerRootView style={styles.container}>
            <GestureDetector gesture={open}>
                <Text>Reminders</Text>
            </GestureDetector>
        </GestureHandlerRootView>
    );
}



export function Calendar(){ //respond to events for rewards, daily log-in bonus  

    //MOLIT animations... 
    //add haptics
    
    const open = Gesture.LongPress().onStart(async ()=>{
        
        const { status } = await DeviceCalendar.requestCalendarPermissionsAsync(); //await user approval
        if (status === 'granted') {
            //grabbing all the calendars (uder the different labels on device preferred calendar... )
            const calendars = await DeviceCalendar.getCalendarsAsync(DeviceCalendar.EntityTypes.EVENT);
            console.log("Calendar fetch complete.");

            let calendar_ids = calendars.map(calendar => calendar.id);
            let upcoming = await DeviceCalendar.getEventsAsync(calendar_ids, DATE, DATE.getDate()+14); //look at events starting today and going until two weeks later... 

            //filter through these events for attendees: getAttendanceForEventAsync()

            //pull attendance status for the current user

            //display reponses - action items

        } else{ //obstruction to fetch
            console.log("Calendar fetch incomplete: ", status);
        }
    }); 

    return (
        <GestureHandlerRootView style={styles.container}>
            <GestureDetector gesture={open}>
                <Text>Calendar</Text>
            </GestureDetector>
        </GestureHandlerRootView>
      );
}




const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
      },
    
  });
  