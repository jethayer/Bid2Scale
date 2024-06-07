import React from 'react'
import { Paragraph } from 'react-native-paper'
import Background from '../components/Background'
import Header from '../components/Header'
import Logo from '../components/Logo'
import{ StyleSheet, Text, View, FlatList} from 'react-native'

//temp data list of different RFPs
const DATA = [
  {
    id:"1",
    title:"RFP 1"
  },
  {
    id:"2",
    title:"RFP 2"
  },
  {
    id:"3",
    title:"Some other RFP"
  },
  {
    id:"4",
    title:"Another Random RFP"
  },
  {
    id:"5",
    title:"It's a RFP"
  },
];
  
const Item = ({title}) => {
  return( 
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
  
// Function to return Screen Definition
export default function RFPScreen({ navigation }) {
  
const renderItem = ({item})=>( 
  <Item title={item.title}/>
);
return (
  <Background>
  <Logo />
  <Header>RFP's</Header>
    <Paragraph>
      Heres a temp list of RFP's
    </Paragraph>
{/*Use Data list to add them all as separate buttons */}
  <View style={styles.container}>
    <FlatList
       data={DATA}
       renderItem={renderItem}
       keyExtractor={item => item.id}
    />
  </View>
  </Background>
  );
}
  
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 5,
    paddingVertical: 2,
    marginTop:30,
    padding:2,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#205493',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },  

  title:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});