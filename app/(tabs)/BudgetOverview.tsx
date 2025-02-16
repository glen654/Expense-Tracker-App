import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { Card } from "react-native-paper";
import { BarChart, PieChart, LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

function BudgetOverview() {
    const totalBudget = 1000;
    const expenses = useSelector((state) => state.expense);

    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const remainingBudget = totalBudget - totalExpenses;

    const barChartData = {
        labels: expenses.map((expense, index) => `M${index + 1}`),
        datasets: [{ data: expenses.map((expense) => expense.amount) }]
    };

    const categoryTotals = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    const pieChartData = Object.keys(categoryTotals).map((category, index) => ({
        name: category,
        population: categoryTotals[category],
        color: ["#ff5733", "#33ff57", "#3357ff", "#ff33a8"][index % 4],
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
    }));

    const lineChartData = {
        labels: expenses.map((expense, index) => `Day ${index + 1}`),
        datasets: [{ data: expenses.map((expense) => expense.amount) }]
    };

    return (
        <ScrollView style={{ flex: 1, padding: 16, backgroundColor: "#f0f0f0" }}>
            <Card style={{ backgroundColor: "#007bff", padding: 16, borderRadius: 8, marginBottom: 16 }}>
                <Card.Content>
                    <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Budget Overview</Text>
                    <Text style={{ color: "white", marginTop: 8 }}>Total Budget: ${totalBudget}</Text>
                    <Text style={{ color: "white", marginTop: 8 }}>Total Expenses: ${totalExpenses.toFixed(2)}</Text>
                    <Text style={{
                        color: remainingBudget < 0 ? "red" : "white",
                        fontSize: 20,
                        fontWeight: "bold"
                    }}>
                        Remaining Budget: ${remainingBudget.toFixed(2)}
                    </Text>
                </Card.Content>
            </Card>

            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>Monthly Expenses</Text>
            <BarChart
                data={barChartData}
                width={screenWidth - 32}
                height={200}
                yAxisLabel="$"
                chartConfig={{
                    backgroundGradientFrom: "#f5f5f5",
                    backgroundGradientTo: "#f5f5f5",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                style={{ marginBottom: 16 }}
             yAxisSuffix={}/>

            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>Expense Breakdown</Text>
            <PieChart
                data={pieChartData}
                width={screenWidth - 32}
                height={200}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />

            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>Expense Trends</Text>
            <LineChart
                data={lineChartData}
                width={screenWidth - 32}
                height={200}
                yAxisLabel="$"
                chartConfig={{
                    backgroundGradientFrom: "#f5f5f5",
                    backgroundGradientTo: "#f5f5f5",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                style={{ marginBottom: 16 }}
            />
        </ScrollView>
    );
}

export default BudgetOverview;