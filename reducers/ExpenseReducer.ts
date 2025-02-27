import Expense from "../models/Expense";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const initialState: Expense[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/expense"
})

export const getAllExpenses = createAsyncThunk("expense/getExpense", async () => {
    try {
        const response = await api.get("/view");
        return response.data;
    } catch (error) {
        console.log(error);
    }
});


export const saveExpense = createAsyncThunk(
    "expense/saveExpense",
    async (expense: Expense) => {
        try {
            const response = await api.post("/add", expense);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const updateExpense = createAsyncThunk(
    "expense/updateExpense",
    async (payload: { name: string; expense: Expense }) => {
        try {
            const response = await api.put(`/update/${payload.name}`, payload.expense);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const deleteExpense = createAsyncThunk(
    "expense/deleteExpense",
    async (name: string) => {
        try {
            const response = await api.delete(`/delete/${name}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);



const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveExpense.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveExpense.rejected, (state, action) => {
                console.error("Failed to save expense", action.payload);
            })
            .addCase(saveExpense.pending, (state, action) => {
                console.error("Pending");
            });
        builder
            .addCase(updateExpense.fulfilled, (state, action) => {
                const index = state.findIndex(
                    (expense) => expense.name === action.payload.name
                );
                if (index !== -1) {
                    state[index] = action.payload;
                }
            })
            .addCase(updateExpense.rejected, (state, action) => {
                console.error("Failed to update expense", action.payload);
            })
            .addCase(updateExpense.pending, (state, action) => {
                console.error("Pending");
            });
        builder
            .addCase(deleteExpense.fulfilled, (state, action) => {
                return state.filter(
                    (expense: Expense) => expense.name !== action.payload.name
                );
            })
            .addCase(deleteExpense.rejected, (state, action) => {
                console.error("Failed to delete expense", action.payload);
            })
            .addCase(deleteExpense.pending, (state, action) => {
                console.error("Pending delete expense");
            });
        builder
            .addCase(getAllExpenses.fulfilled, (state, action) => {
                action.payload.map((expense: Expense) => {
                    state.push(expense);
                });
            })
            .addCase(getAllExpenses.rejected, (state, action) => {
                console.error("Failed to load expense", action.payload);
            })
            .addCase(getAllExpenses.pending, (state, action) => {
                console.error("Pending load expense");
            });
    },
});

export default expenseSlice.reducer;