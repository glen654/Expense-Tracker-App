import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import {useRouter} from "expo-router";
import { Card } from "react-native-paper"

import { Ionicons } from "@expo/vector-icons";

function index(){
    const expenses = useSelector((state) => state.expense);
    const router = useRouter();

    const totalBudget = 1000;
    const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
    const remainingBudget = totalBudget - totalSpent;

    return (
        <View style={{ flex: 1, backgroundColor: '#f0f0f0', padding: 16 }}>
            <Card style={{ backgroundColor: 'blue', padding: 16, borderRadius: 8, marginBottom: 16 }}>
                <Card.Content>
                    <Text style={{ color: 'white' }}>Total Budget:</Text>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>${totalBudget}</Text>
                    <Text style={{ color: 'white', marginTop: 8 }}>Remaining:</Text>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>${remainingBudget}</Text>
                </Card.Content>
            </Card>

            <FlatList
                data={expenses}
                renderItem={({ item }) => (
                    <Card style={{ marginBottom: 8 }}>
                        <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text>{item.category}</Text>
                            <View>
                                <Text>${item.amount}</Text>
                                <Text>{item.date}</Text>
                            </View>
                        </Card.Content>
                    </Card>
                )}
                keyExtractor={(item) => item.id}
            />

            <TouchableOpacity
                style={{
                    position: 'absolute',
                    bottom: 24,
                    right: 24,
                    backgroundColor: 'green',
                    borderRadius: 28,
                    padding: 12,
                    elevation: 4,
                }}
                onPress={() => router.push('/ExpenseForm')}
            >
                <Ionicons name="add" size={30} color="white" />
            </TouchableOpacity>
        </View>
    )
}

export default index;