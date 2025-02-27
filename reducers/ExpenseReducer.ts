import Expense from "../models/Expense";
import {createSlice} from "@reduxjs/toolkit";

export const initialState: Expense[] = [];

const ExpenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        addExpense: (state, action) => {
            state.push(action.payload);
        },
        deleteExpense: (state, action) => {
            return state.filter(expense => expense.name !== action.payload);
        },
    }
})

export const { addExpense, deleteExpense, } = ExpenseSlice.actions;
export default ExpenseSlice.reducer;