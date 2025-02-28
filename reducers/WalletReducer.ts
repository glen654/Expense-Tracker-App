import Wallet from "../models/Wallet";
import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import wallet from "../app/(tabs)/Wallet";

export const initialState:Wallet[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/wallet"
})

export const getAllWallets = createAsyncThunk("wallet/getWallet", async () => {
    try {
        const response = await api.get("/view");
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const getWalletAmount = createAsyncThunk(
    "wallet/getWalletAmount",
    async (name: string) => {
        try {
            const response = await api.get(`/amount/${name}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const saveWallet = createAsyncThunk(
    "wallet/saveWallet",
    async (wallet: Wallet) => {
        try {
            const response = await api.post("/add", wallet);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const updateWallet = createAsyncThunk(
    "wallet/updateWallet",
    async (payload: { name: string; wallet: Wallet }) => {
        try {
            const response = await api.put(`/update/${payload.name}`, payload.wallet);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const deleteWallet = createAsyncThunk(
    "wallet/deleteWallet",
    async (name: string) => {
        try {
            const response = await api.delete(`/delete/${name}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveWallet.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveWallet.rejected, (state, action) => {
                console.error("Failed to save wallet", action.payload);
            })
            .addCase(saveWallet.pending, (state, action) => {
                console.error("Pending");
            });
        builder
            .addCase(updateWallet.fulfilled, (state, action) => {
                const index = state.findIndex(
                    (wallet) => wallet.name === action.payload.name
                );
                if (index !== -1) {
                    state[index] = action.payload;
                }
            })
            .addCase(updateWallet.rejected, (state, action) => {
                console.error("Failed to update wallet", action.payload);
            })
            .addCase(updateWallet.pending, (state, action) => {
                console.error("Pending");
            });
        builder
            .addCase(deleteWallet.fulfilled, (state, action) => {
                return state.filter(
                    (wallet: Wallet) => wallet.name !== action.payload.name
                );
            })
            .addCase(deleteWallet.rejected, (state, action) => {
                console.error("Failed to delete wallet", action.payload);
            })
            .addCase(deleteWallet.pending, (state, action) => {
                console.error("Pending delete wallet");
            });
        builder
            .addCase(getAllWallets.fulfilled, (state, action) => {
                action.payload.map((wallet: Wallet) => {
                    state.push(wallet);
                });
            })
            .addCase(getAllWallets.rejected, (state, action) => {
                console.error("Failed to load wallet", action.payload);
            })
            .addCase(getAllWallets.pending, (state, action) => {
                console.error("Pending load wallet");
            });
        builder
            .addCase(getWalletAmount.fulfilled, (state, action) => {
                action.payload.map((wallet: Wallet) => {
                    state.push(wallet);
                });
            })
            .addCase(getWalletAmount.rejected, (state, action) => {
                console.error("Failed to load wallet amount", action.payload);
            })
            .addCase(getWalletAmount.pending, (state, action) => {
                console.error("Pending");
            });
    },
});

export default walletSlice.reducer;