import {View, Text, TextInput,Button,StyleSheet} from "react-native";
import {useDispatch, useSelector} from 'react-redux';
import { getAllExpenses, saveExpense} from '../../reducers/ExpenseReducer';
import {useEffect, useState} from "react";
import {AppDispatch} from "../../Store/Store";
import {Category} from "../../models/enums/Category";

function ExpenseForm(){
    const dispatch = useDispatch<AppDispatch>();
    const expenses = useSelector((state) =>state.expense);

    const initialExpenseState = {
        name: "",
        amount: 0,
        category: "" as Category,
        date: "",
        description: "",
    }

    const [expense, setExpense] = useState(initialExpenseState);

    const handleAddExpense = () => {
        if(!expense.name || !expense.amount || !expense.category || !expense.date || !expense.description) {
            alert("All fields are required");
            return
        }
        const newExpense = {name: expense.name, amount: expense.amount, category: expense.category, date: expense.date, description: expense.description};
        dispatch(saveExpense(newExpense));
        dispatch(getAllExpenses());
    };
    useEffect(() => {
        dispatch(getAllExpenses());
    }, [dispatch]);
    return(
        <View>
            <TextInput
                placeholder="Name"
                style={styles.input}
                value={expense.name}
                onChangeText={(text) => setExpense({...expense, name: text})}
            />
            <TextInput
                placeholder="Amount"
                style={styles.input}
                value={String(expense.amount)}
                onChangeText={(text) => setExpense({...expense, amount: parseFloat(text) || 0})}
            />
            <TextInput
                placeholder="Category"
                style={styles.input}
                value={expense.category}
                onChangeText={(text) => setExpense({...expense, category: text as Category})}
            />
            <TextInput
                placeholder="Date"
                style={styles.input}
                value={expense.date}
                onChangeText={(text) => setExpense({...expense, date: text})}
            />
            <TextInput
                placeholder="Amount"
                keyboardType="numeric"
                style={styles.input}
                value={expense.description}
                onChangeText={(text) => setExpense({...expense, description: text})}
            />
            <View style={styles.buttonWrapper}>
                <Button title="Add Expense" onPress={handleAddExpense} />
            </View>
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
        borderRadius: 20,
        width: '90%',
        marginLeft: 20,
        marginTop: 20
    },
    buttonWrapper: {
        backgroundColor: 'blue',
        borderRadius: 10,
        overflow: 'hidden',
        width: 200,
        marginBottom: 20,
        marginLeft: 20
    },
});

export default ExpenseForm;