import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

class Calculator extends Component {
  state = {
    display: '0',
    firstNumber: '',
    operation: null,
    waitingForSecondNumber: false
  };

  handleNumberPress = (number) => {
    const { display, waitingForSecondNumber } = this.state;

    if (waitingForSecondNumber) {
      this.setState({
        display: String(number),
        waitingForSecondNumber: false
      });
    } else {
      this.setState({
        display: display === '0' ? String(number) : display + number
      });
    }
  };

  handleOperationPress = (operation) => {
    const { display, firstNumber } = this.state;
    
    if (firstNumber && this.state.operation) {
      this.calculateResult();
    }

    this.setState({
      firstNumber: display,
      operation: operation,
      waitingForSecondNumber: true
    });
  };

  calculateResult = () => {
    const { firstNumber, display, operation } = this.state;
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '×':
        result = num1 * num2;
        break;
      case '÷':
        result = num1 / num2;
        break;
    }

    this.setState({
      display: String(result),
      firstNumber: '',
      operation: null,
      waitingForSecondNumber: false
    });
  };

  handleClear = () => {
    this.setState({
      display: '0',
      firstNumber: '',
      operation: null,
      waitingForSecondNumber: false
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.display}>
          <Text style={styles.displayText}>{this.state.display}</Text>
        </View>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.buttonGray} onPress={this.handleClear}>
            <Text style={styles.buttonText}>AC</Text>
          </TouchableOpacity>
          <View style={styles.emptySpace} />
          <TouchableOpacity 
            style={styles.buttonOrange} 
            onPress={() => this.handleOperationPress('÷')}
          >
            <Text style={styles.buttonText}>÷</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => this.handleNumberPress(7)}
          >
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => this.handleNumberPress(8)}
          >
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => this.handleNumberPress(9)}
          >
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.buttonOrange}
            onPress={() => this.handleOperationPress('×')}
          >
            <Text style={styles.buttonText}>×</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => this.handleNumberPress(4)}
          >
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => this.handleNumberPress(5)}
          >
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => this.handleNumberPress(6)}
          >
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.buttonOrange}
            onPress={() => this.handleOperationPress('-')}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => this.handleNumberPress(1)}
          >
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => this.handleNumberPress(2)}
          >
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => this.handleNumberPress(3)}
          >
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.buttonOrange}
            onPress={() => this.handleOperationPress('+')}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.buttonZero}
            onPress={() => this.handleNumberPress(0)}
          >
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => this.handleNumberPress('.')}
          >
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.buttonOrange}
            onPress={this.calculateResult}
          >
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  display: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
  },
  displayText: {
    color: '#ffffff',
    fontSize: 70,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonZero: {
    width: 180,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 30,
  },
  buttonGray: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#A5A5A5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOrange: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#FF9F0A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 30,
  },
  emptySpace: {
    width: 170,
    height: 80,
    backgroundColor: '#A5A5A5',
    borderRadius: 20,
  },
});

export default Calculator;