import { FlatList, View ,Text, Pressable} from "react-native"
import { darkBlue, halfBlack } from "../../assets/colours"

export const ChatListComp =()=>{
    const chats = [
        {key:1, type:'me', message: 'Where are you please?', time: '4:45am'},
        {key:2, type:'you', message: 'I am at the market, why?', time: '4:48am'},
        {key:3, type:'me', message: 'Just chatting you, it has being a long day since we both have contact and your mum said I should be greeting you', time: '4:50am'},
        {key:4, type:'you', message: 'Thanks so much, I really appreciate it very much and how is my sister?', time: '4:51am'},
        {key:5, type:'you', message: 'And also help me tell my mum to pls help me cook something befor I get home', time: '4:51am'},
        {key:6, type:'me', message:'Alright, I will deliver your message', time: '4:53am'},
        {key:7, type:'me', message: 'Just take care', time: '4:55am'},
        {key:8, type:'me', message: 'How are your babes there sha, hope they are doing fine and cool?', time: '5:00am'},
        {key:9, type:'you', message: 'Babe ke, smiles, I never get one', time: '5:05am'},
        {key:10, type:'me', message: 'Nah so u go dey lie, abeg jare, good night and have a nice rest', time: '5:07am'},
        {key:11, type:'you', message: 'You too, good night', time: '5:15am'},
        {key:12, type:'me', message: 'Wait, before you go, can you tell me where you are currently', time: '5:17am'},
        {key:13, type:'you', message: 'I am currently enjoying my life in my hostel', time: '5:17am'},
        {key:42, type:'me', message: 'Where are you please?', time: '4:45am'},
        {key:22, type:'you', message: 'I am at the market, why?', time: '4:48am'},
        {key:32, type:'me', message: 'Just chatting you, it has being a long day since we both have contact and your mum said I should be greeting you', time: '4:50am'},
        {key:43, type:'you', message: 'Thanks so much, I really appreciate it very much and how is my sister?', time: '4:51am'},
        {key:45, type:'you', message: 'And also help me tell my mum to pls help me cook something befor I get home', time: '4:51am'},
        {key:65, type:'me', message:'Alright, I will deliver your message', time: '4:53am'},
        {key:75, type:'me', message: 'Just take care', time: '4:55am'},
        {key:85, type:'me', message: 'How are your babes there sha, hope they are doing fine and cool?', time: '5:00am'},
        {key:95, type:'you', message: 'Babe ke, smiles, I never get one', time: '5:05am'},
        {key:150, type:'me', message: 'Nah so u go dey lie, abeg jare, good night and have a nice rest', time: '5:07am'},
        {key:151, type:'you', message: 'You too, good night', time: '5:15am'},
        {key:152, type:'me', message: 'Wait, before you go, can you tell me where you are currently', time: '5:17am'},
        {key:153, type:'you', message: 'I am currently enjoying my life in my hostel', time: '5:17am'},
    ]
    return (
        <FlatList
                style={{marginVertical:10}}
                showsVerticalScrollIndicator={false}
                data={chats}
                renderItem={({item})=>{
                    if (item.type=='me'){
                        return(
                            <Pressable android_ripple={{color:'#5555ff'}} style={{alignSelf:'flex-end', backgroundColor:darkBlue, maxWidth:'80%', marginVertical:5,  paddingVertical:7,borderRadius:10}}>
                                <Text style={{color:'white',paddingHorizontal:10,}}>{item.message}</Text>
                                <Text style={{alignSelf:'flex-end',fontSize:12, color:'#cccccc',paddingHorizontal:5, marginTop:5}}>{item.time}</Text>
                            </Pressable>
                        )
                    }
                    else{
                        return (
                            <Pressable android_ripple={{color:'#454545'}} style={{alignSelf:'flex-start', backgroundColor:halfBlack,maxWidth:'80%',marginVertical:5, paddingHorizontal:10, paddingVertical:7, borderRadius:10}}>
                                <Text style={{color:'white'}}>{item.message}</Text>
                                <Text style={{alignSelf:'flex-end',fontSize:12, color:'#cccccc',paddingHorizontal:5, marginTop:5}}>{item.time}</Text>
                            </Pressable>
                        )
                    }
                }}
             />
    )
}