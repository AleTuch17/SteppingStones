import { StyleSheet, Text, View } from 'react-native';
import Counter from "./sensors";
import Game from "./game";


const Stepper = <Counter/>;
const Gaming = <Game/>;



export default function App() { 

  //for fun weather reporting, if can make the background window transparent? somehow

  return (
      <View style={styles.screen}>
        <View>
          <Text style={styles.title}>SteppingStones</Text>
          <Text>The RPG - that counts!</Text>
        </View>
        <View>
          {Gaming}
          {Stepper}
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 15,
  },
  title:{
    fontSize: 30
  },
});
