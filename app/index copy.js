import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import SplashScreen from "./SplashScreenView";


const ButtonComponent = ({ title, onPress, disabled, backgroundColor, borderColor, color }) => (
  <TouchableOpacity 
    style={[styles.button, { backgroundColor, borderColor }]}
    onPress={!disabled ? onPress : null}
    disabled={disabled}
    activeOpacity={0.7}
  >
    <Text style={[styles.buttonText, { color: disabled ? "gray" : color }]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const App = () => {
  const [input, setInput] = useState("0");
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Handle dimension changes
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions(window);
    });

    // Handle splash screen timing
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show splash screen for 2 seconds

    return () => {
      subscription.remove();
      clearTimeout(timer);
    };
  }, []);

  // If still loading, show splash screen
  if (isLoading) {
    return <SplashScreen />;
  }

  const handlePress = (value) => {
    if (value === "AC") {
      setInput("0");
    } else if (value === "=") {
      try {
        setInput(eval(input).toString()); // Avoid using eval in production
      } catch (error) {
        setInput("Error");
      }
    } else {
      setInput(input === "0" ? value : input + value);
    }
  };

  const buttonConfig = [
    { title: "AC", backgroundColor: "#636466", borderColor: "#555759", color: "#e8e9ea", disabled: false },
    { title: "÷", backgroundColor: "#636466", borderColor: "#555759", color: "#e8e9ea", disabled: false },
    { title: "×", backgroundColor: "#636466", borderColor: "#555759", color: "#e8e9ea", disabled: false },
    { title: "−", backgroundColor: "#636466", borderColor: "#555759", color: "#e8e9ea", disabled: false },
    { title: "+", backgroundColor: "#636466", borderColor: "#555759", color: "#e8e9ea", disabled: false },
    { title: "=", backgroundColor: "#ff9a00", borderColor: "#555759", color: "#e8e9ea", disabled: false },
    { title: ".", backgroundColor: "#636466", borderColor: "#555759", color: "#e8e9ea", disabled: false },
    { title: "0", backgroundColor: "#636466", borderColor: "#555759", color: "#e8e9ea", disabled: false },
  ];

  const buttonsPortrait = [
    ["AC", "", "", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "−"],
    ["1", "2", "3", "+"],
    ["0", ".", "", "="],
  ];

  const buttonsLandscape = [
    ["(", ")", "mc", "m+", "m-", "mr", "AC", "+/-", "%", "÷"],
    ["2ⁿᵈ", "x²", "x³", "xʸ", "eˣ", "10ˣ", "7", "8", "9", "x"],
    ["¹/ₓ", "√x", "∛x", "ˣ√x", "ln", "log₁₀", "4", "5", "6", "-"],
    ["x!", "sin", "cos", "tan", "e", "EE", "1", "2", "3", "+"],
    ["Rad", "sinh", "cosh", "tanh", "π", "Rand", "0", "", ",", "="],
  ];

  const buttons = dimensions.width > dimensions.height ? buttonsLandscape : buttonsPortrait;

  return (
    <View style={styles.container}>
      <View style={styles.result}>
        <Text style={styles.resultText}>{input}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((row, rowIndex) => (
          <View style={styles.row} key={rowIndex}>
            {row.map((button, buttonIndex) => {
              const isLastInRow = buttonIndex === row.length - 1;
              
              let config = buttonConfig.find((b) => b.title === button) || {
                title: button,
                backgroundColor: "#636466",
                borderColor: button ? "#555759" : "transparent",
                color: "#e8e9ea",
                disabled: button === "",
              };

              if (isLastInRow && button !== "") {
                config = {
                  ...config,
                  backgroundColor: "#ff9a00",
                };
              }

              return (
                <ButtonComponent
                  key={buttonIndex}
                  title={config.title}
                  backgroundColor={config.backgroundColor}
                  borderColor={config.borderColor}
                  color={config.color}
                  disabled={config.disabled}
                  onPress={() => handlePress(config.title)}
                />
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
  },
  result: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "#000",
    padding: 10,
  },
  resultText: {
    fontSize: 48,
    color: "#fff",
  },
  buttons: {
    flex: 5,
    backgroundColor: "#444",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
  },
  buttonText: {
    fontSize: 28,
    color: "#fff",
  },
});

export default App;