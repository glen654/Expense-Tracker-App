export default interface Expense {
    id: string;
    amount: number;
    category: string;
    date: string;
    description?: string;
}