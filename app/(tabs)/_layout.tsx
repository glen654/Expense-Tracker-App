import {Tabs} from "expo-router";

function TabLayout(){
    return(
        <Tabs>
            <Tabs.Screen name='index' options={{headerTitle:'Home', title:'Home'}}/>
        </Tabs>
    )
}

export default TabLayout;