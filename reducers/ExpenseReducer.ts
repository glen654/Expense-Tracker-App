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
        editExpense: (state, action) => {

        },
        deleteExpense: (state, action) => {

        },
        getExpense: (state, action) => {

        }
    }
})

export const { addExpense, editExpense, deleteExpense, getExpense } = ExpenseSlice.actions;
export default ExpenseSlice.reducer;