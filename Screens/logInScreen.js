import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const isWeb = Platform.OS === "web";
const cardWidth = isWeb ? Math.min(400, width * 0.4) : "90%";

export default function LoginScreen() {
  const navigation = useNavigation();

  const handleLoginPress = (screen) => {
    navigation.navigate(screen);
  };

  const loginOptions = [
    {
      title: "Admin",
      screen: "AdminLogin",
      icon: "security",
      color: "#6a11cb",
    },
    {
      title: "Teacher",
      screen: "TeacherLogin",
      icon: "school",
      color: "#2575fc",
    },
    {
      title: "Student",
      screen: "StudentLogin",
      icon: "person",
      color: "#11998e",
    },
  ];

  return (
    <ImageBackground style={styles.background} blurRadius={2}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.overlay}>
            <View style={[styles.card, { width: cardWidth }]}>
              <Text style={styles.title}>Welcome.!</Text>
              <Text style={styles.subtitle}>Please select your login type</Text>

              {loginOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleLoginPress(option.screen)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={[option.color, `${option.color}90`]}
                    style={styles.loginButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <MaterialIcons
                      name={option.icon}
                      size={24}
                      color="white"
                      style={styles.icon}
                    />
                    <Text style={styles.buttonText}>{option.title}</Text>
                    <MaterialIcons
                      name="arrow-forward"
                      size={20}
                      color="white"
                    />
                  </LinearGradient>
                </TouchableOpacity>
              ))}

              <View style={styles.footer}>
                <Text style={styles.footerText}>Need help?</Text>
                <TouchableOpacity>
                  <Text style={styles.helpText}>Contact Support</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Fallback if no image
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    marginLeft: 15,
  },
  icon: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    color: "#666",
    fontSize: 14,
  },
  helpText: {
    color: "#3b5998",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 5,
  },
});
