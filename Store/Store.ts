import {configureStore} from "@reduxjs/toolkit";
import expenseReducer from "../reducers/ExpenseReducer";
import BalanceReducer from "../reducers/BalanceReducer";
import WalletReducer from "../reducers/WalletReducer";

export const store = configureStore({
    reducer: {
        expense: expenseReducer,
        balance: BalanceReducer,
        wallet: WalletReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;