import {Stack} from "expo-router";
import {Provider} from "react-redux";
import {store} from "../Store/Store";
import {PaperProvider} from "react-native-paper";

function RootLayout() {
    return(
        <Provider store={store}>
            <PaperProvider>
                <Stack>
                    <Stack.Screen name='(tabs)' options={{headerShown:false}}/>
                </Stack>
            </PaperProvider>

        </Provider>

    )
}

export default RootLayout;