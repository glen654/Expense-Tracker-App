import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {Card, Button, IconButton} from 'react-native-paper';
import {getAllExpenses} from "../../reducers/ExpenseReducer";
import {AppDispatch} from "../../Store/Store";
import {getWalletAmount} from "../../reducers/WalletReducer";
import {useNavigation} from "expo-router";

function index(){
    const dispatch = useDispatch<AppDispatch>();
    const expenses = useSelector((state) => state.expense);
    const wallets = useSelector((state) => state.wallet);
    const navigation = useNavigation();
    const [walletAmount,setWalletAmount] = useState(null);

    useEffect(() => {
        dispatch(getAllExpenses());
        const fetchWalletAmount = async () => {
            try {
                const response = await dispatch(getWalletAmount(wallets.amount));
                console.log(response.payload.amount);
                setWalletAmount(response.payload.amount);
            } catch (error) {
                console.error('Error fetching wallet amount:', error);
            }
        };
        fetchWalletAmount();
    }, [dispatch]);
    const renderExpense = ({ item }) => (
        <View style={styles.card}>
            <IconButton
                icon="cash"
                size={30}
                style={styles.icon}
            />
            <View style={styles.cardContent}>
                <Text style={styles.walletName}>{item.name}</Text>
                <Text style={styles.walletAmount}>{item.amount}</Text>
                <Text style={styles.walletAmount}>{item.description}</Text>
            </View>
        </View>
    );
    return(
        <View style={styles.container}>
            <Text style={styles.balance}>Balance: Rs: {walletAmount}</Text>
            <Button mode="contained" onPress={() => navigation.navigate('ExpenseForm')} style={styles.addButton}>
                Add Expense
            </Button>

            <FlatList
                data={expenses}
                renderItem={renderExpense}
                keyExtractor={(item) => item.id}
                style={styles.walletList}
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
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        borderRadius: 8,
        width: '90%',
        marginLeft: 30
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 150,
    },
    walletName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    walletList: {
        marginTop: 20,
    },
    walletAmount: {
        fontSize: 16,
        color: '#4CAF50',
    },
    icon: {
        marginRight: 15,
    },
    cardContent: {
        justifyContent: 'center',

    },
});

export default index;