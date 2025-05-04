import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Platform,
} from "react-native";
import { StatusBar as RNStatusBar } from "react-native";

export default function HomeScreen({ navigation }) {
  const handleStart = () => {
    navigation.navigate("Next");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>School Management App</Text>
      </View>

      {/* Middle with Background Image */}
      <View style={styles.middle}>
        <ImageBackground
          // source={require("../assets/classwork.jpg")}
          style={styles.bgImage}
        >
          <TouchableOpacity onPress={handleStart} style={styles.button}>
            <Text style={styles.buttonText}>Let's Get Started</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footerText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerText}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerText}>Partners</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerText}>T&C</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
  },

  header: {
    alignItems: "center",
    height: "100%",
    width: "100%",
    flex: 1,
    backgroundColor: "#03cffc",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },

  middle: {
    alignItems: "center",
    flex: 10,
    width: "100%",
  },

  bgImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 10,
  },

  button: {
    backgroundColor: "#3b5998",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginBottom: 20,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    width: "100%",
    backgroundColor: "#03cffc",
  },

  footerText: {
    fontSize: 14,
    color: "#3b5998",
  },
});
