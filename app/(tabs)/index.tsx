import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense } from '../../reducers/ExpenseReducer';
import { deductFunds } from '../../reducers/BalanceReducer';
import { Card, Button } from 'react-native-paper';

function index(){
    const balance = useSelector(state => state.expense);
    const expenses = useSelector(state => state.balance);

    const dispatch = useDispatch();

    const handleAddExpense = (expense) => {
        dispatch(addExpense(expense));
        dispatch(deductFunds(expense.amount));
    };
    return(
        <View style={styles.container}>
            <Text style={styles.balance}>Balance: Rs.
                {balance}</Text>
            {/*<Button mode="contained" onPress={() => navigation.navigat('Add Expense')}>*/}
            {/*    Add Expense*/}
            {/*</Button>*/}

            <FlatList
                data={expenses}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Text>{item.description}</Text>
                        <Text>₹{item.amount}</Text>
                    </Card>
                )}
                keyExtractor={item => item.id}
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
    },
});

export default index;