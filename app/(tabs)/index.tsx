import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button } from 'react-native-paper';
import {getAllExpenses} from "../../reducers/ExpenseReducer";
import {AppDispatch} from "../../Store/Store";
import {getWalletAmount} from "../../reducers/WalletReducer";

function index(){
    const dispatch = useDispatch<AppDispatch>();
    const expenses = useSelector((state) => state.expense);
    const wallets = useSelector((state) => state.wallet);
    const [walletAmount,setWalletAmount] = useState(0);

    useEffect(() => {
        dispatch(getAllExpenses());
        const fetchWalletAmount = async () => {
            try {
                const response = await dispatch(getWalletAmount(wallets.name));
                const data = response.json()
                setWalletAmount(data.amount);
            } catch (error) {
                console.error('Error fetching wallet amount:', error);
            }
        };

        fetchWalletAmount();
    }, [dispatch,wallets]);

    return(
        <View style={styles.container}>
            <Text style={styles.balance}>Balance: Rs.
                {walletAmount}</Text>
            {/*<Button mode="contained" onPress={() => navigation.navigat('Add Expense')}>*/}
            {/*    Add Expense*/}
            {/*</Button>*/}

            <FlatList
                data={expenses}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Text>{item.name}</Text>
                        <Text>{item.description}</Text>
                        <Text>₹{item.amount}</Text>
                    </Card>
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    balance: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    card: {
        marginVertical: 8,
        padding: 16,
        backgroundColor: '#ffffff',
    },
});

export default index;