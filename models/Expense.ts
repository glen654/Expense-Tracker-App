import {Category} from "./enums/Category";


export default interface Expense {
    name: string;
    amount: number;
    category: Category;
    date: string;
    description?: string;
}