import {Tabs} from "expo-router";

function TabLayout(){
    return(
        <Tabs>
            <Tabs.Screen name='index' options={{headerTitle:'Home', title:'Home'}}/>
            <Tabs.Screen name='BudgetOverview' options={{headerTitle:'BudgetOverview', title:'BudgetOverview'}}/>
            <Tabs.Screen name='Wallet' options={{headerTitle:'Wallet', title:'Wallet'}}/>
        </Tabs>
    )
}

export default TabLayout;