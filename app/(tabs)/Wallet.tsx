import {Button, FlatList, StyleSheet, Text, TextInput, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../Store/Store";
import {useState} from "react";
import {getAllWallets, saveWallet, updateWallet} from "../../reducers/WalletReducer";
import {IconButton} from "react-native-paper";

function Wallet(){
    const dispatch = useDispatch<AppDispatch>();
    const wallets = useSelector((state) =>state.wallet);

    const initialWalletState = {
        name: "",
        amount: 0
    }

    const [wallet,setWallet] = useState(initialWalletState);

    const handleAddNewWallet = async () => {
        if (
            !wallet.name ||
            !wallet.amount
        ) {
            alert("All fields are required");
            return;
        }
        const newWallet = {name:wallet.name, amount:wallet.amount};
        dispatch(saveWallet(newWallet));
        dispatch(getAllWallets());
    }

    const handleUpdateWallet = async () => {
        if (
            !wallet.name ||
            !wallet.amount
        ) {
            alert("All fields are required");
            return;
        }
        const updatedWallet = {name:wallet.name, amount:wallet.amount};
        dispatch(updateWallet({name: wallet.name, wallet: updatedWallet}));
        dispatch(getAllWallets());
    }

    const renderWallet = ({ item }) => (
        <View style={styles.card}>
            <IconButton
                icon="wallet"
                size={30}
                style={styles.icon}
            />
            <View style={styles.cardContent}>
                <Text style={styles.walletName}>{item.name}</Text>
                <Text style={styles.walletAmount}>${item.amount}</Text>
            </View>
        </View>
    );

    return(
        <View>
            <Text style={styles.header}>Add Wallet</Text>
            <TextInput
                placeholder="Wallet Name"
                style={styles.input}
                value={wallet.name}
                onChangeText={(text) => setWallet({...wallet, name:text})}
            />
            <TextInput
                placeholder="Amount"
                style={styles.input}
                value={String(wallet.amount)}
                onChangeText={(text) => setWallet({...wallet, amount: parseFloat(text) || 0})}
            />
            <Button title="Add Wallet" onPress={handleAddNewWallet} />
            <Button title="Update Wallet" onPress={handleUpdateWallet} />

            <FlatList
                data={wallets}
                renderItem={renderWallet}
                keyExtractor={(item) => item.name}
                style={styles.walletList}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 20,
    },
    walletList: {
        marginTop: 20,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    icon: {
        marginRight: 15,
    },
    cardContent: {
        justifyContent: 'center',
    },
    walletName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    walletAmount: {
        fontSize: 16,
        color: '#4CAF50',
    },
});

export default Wallet;