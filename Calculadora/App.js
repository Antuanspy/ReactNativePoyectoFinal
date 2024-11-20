import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import HomeScreen from './HomeScreen';

const Stack = createNativeStackNavigator();

function CalculatorScreen({ navigation }) {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);

  // Helper function to format numbers with commas
  const formatNumber = (value) => {
    if (!value) return ''; // If empty, return an empty string
    const numericValue = value.replace(/,/g, ''); // Remove commas for calculation
    if (isNaN(numericValue)) return value; // If not a valid number, return as is
    return parseFloat(numericValue).toLocaleString(); // Format with commas
  };

  // Handlers for input changes
  const handleNum1Change = (value) => {
    setNum1(formatNumber(value));
  };

  const handleNum2Change = (value) => {
    setNum2(formatNumber(value));
  };

  const handleAddition = () => {
    const val1 = parseFloat(num1.replace(/,/g, ''));
    const val2 = parseFloat(num2.replace(/,/g, ''));
    setResult((val1 + val2).toLocaleString());
  };

  const handleSubtraction = () => {
    const val1 = parseFloat(num1.replace(/,/g, ''));
    const val2 = parseFloat(num2.replace(/,/g, ''));
    setResult((val1 - val2).toLocaleString());
  };

  const handleMultiplication = () => {
    const val1 = parseFloat(num1.replace(/,/g, ''));
    const val2 = parseFloat(num2.replace(/,/g, ''));
    setResult((val1 * val2).toLocaleString());
  };

  const handleDivision = () => {
    const val1 = parseFloat(num1.replace(/,/g, ''));
    const val2 = parseFloat(num2.replace(/,/g, ''));
    if (val2 === 0) {
      setResult('Cannot divide by 0');
    } else {
      setResult((val1 / val2).toLocaleString());
    }
  };

  const handleReset = () => {
    setNum1('');
    setNum2('');
    setResult(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculator</Text>

      {/* Input fields */}
      <TextInput
        style={styles.input}
        placeholder="Enter first number"
        keyboardType="numeric"
        value={num1}
        onChangeText={handleNum1Change}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter second number"
        keyboardType="numeric"
        value={num2}
        onChangeText={handleNum2Change}
      />

      {/* Buttons for operations */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAddition}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSubtraction}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleMultiplication}>
          <Text style={styles.buttonText}>*</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDivision}>
          <Text style={styles.buttonText}>/</Text>
        </TouchableOpacity>
      </View>

      {/* Result display */}
      <Text style={styles.resultLabel}>Result:</Text>
      <Text style={styles.resultValue}>
        {result !== null ? result : '...'}
      </Text>

      {/* Buttons aligned with result */}
      <View style={styles.secondaryButtonContainer}>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleReset}>
          <Text style={styles.secondaryButtonText}>New Calculation</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.secondaryButton, { backgroundColor: '#ff5722' }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.secondaryButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Welcome' }} />
        <Stack.Screen name="Calculator" component={CalculatorScreen} options={{ title: 'Calculator' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '80%',
    fontSize: 18,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    width: '80%',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#4caf50',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  resultLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 20,
  },
  resultValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 20,
  },
  secondaryButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 10,
  },
  secondaryButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#2196f3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});



// npx create-expo-app listaSuper --template blank 
// luego cd y te vas a la carpeta que quieres "$ cd Calculadora"
// luego es "npx expo start" y al mismo tiempo abre Android Studio
// luego picala a tu letra "a" en el teclado
// acuerdate {} significa que vamos a usar JS
// React es una librereria de JS
// el <View> <View/> son como </div> en HTML
// ctrl + c para empezar de 0 la terminal