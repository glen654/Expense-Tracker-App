import { useNavigation } from "expo-router";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { Platform, View } from "react-native";
import { addExpense } from "../../reducers/ExpenseReducer";
import { Text, TextInput, Button } from 'react-native-paper';
import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';


function ExpenseForm(){
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleDateChange = (event: any, selectedDate?: Date) => {
        if (selectedDate) {
            setDate(selectedDate);
        }
        setShowDatePicker(Platform.OS === 'ios');
    };

    const handleAddExpense = () => {
        if (!amount || isNaN(parseFloat(amount)) || !category) {
            setError('Please enter a valid amount and category.');
            return;
        }

        const newExpense = {
            id: Date.now().toString(),
            amount: parseFloat(amount),
            category,
            date: moment(date).format('YYYY-MM-DD'),
            description,
        };

        dispatch(addExpense(newExpense));
        navigation.goBack();
    };

    return(
        <View style={{ flex: 1, padding: 16, backgroundColor: '#f0f0f0' }}>
            <Text style={{ marginBottom: 16, fontSize: 20, fontWeight: 'bold' }}>Add Expense</Text>

            {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}

            <TextInput
                label="Amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                style={{ marginBottom: 12 }}
            />

            <TextInput
                label="Category"
                value={category}
                onChangeText={setCategory}
                style={{ marginBottom: 12 }}
            />

            <Button mode="outlined" onPress={() => setShowDatePicker(true)}>
                Select Date
            </Button>

            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            <Text style={{ marginVertical: 10 }}>{moment(date).format('YYYY-MM-DD')}</Text>

            <TextInput
                label="Description (Optional)"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
                style={{ marginBottom: 12 }}
            />

            <Button mode="contained" onPress={handleAddExpense} style={{ marginTop: 16 }}>
                Add Expense
            </Button>
        </View>
    )
}

export default ExpenseForm;