import {View, Text, TextInput,Button,StyleSheet} from "react-native";
import { useDispatch } from 'react-redux';
import { addExpense } from '../../reducers/ExpenseReducer';
// import { deductFunds } from '../redux/balanceSlice';
import {useState} from "react";

function ExpenseForm(){
    const[name,setName]=useState("");
    const [category,setCategory]=useState("");
    const [date,setDate]=useState("");
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = () => {
        const expense = {
            id: Math.random().toString(),
            description,
            amount: parseFloat(amount),
        };

        dispatch(addExpense(expense));
        // dispatch(deductFunds(expense.amount));

        setDescription('');
        setAmount('');
    };
    return(
        <View>
            <Text style={styles.header}>Add Expense</Text>
            <TextInput
                placeholder="Name"
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <TextInput
                placeholder="Category"
                style={styles.input}
                value={category}
                onChangeText={setCategory}
            />
            <TextInput
                placeholder="Description"
                style={styles.input}
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                placeholder="Date"
                style={styles.input}
                value={date}
                onChangeText={setDate}
            />
            <TextInput
                placeholder="Amount"
                keyboardType="numeric"
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
            />
            <Button title="Add Expense" onPress={handleSubmit} />
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 20
    },
});

export default ExpenseForm;