import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

export default function PreRegister() {
  const navigation = useNavigation();
  const [selectedSchool, setSelectedSchool] = useState("");
  const [isPickerFocused, setIsPickerFocused] = useState(false);
  const [schoolList, setSchoolList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch("http://localhost:5000/retrieveschool");
        const data = await response.json();
        console.log(data.data);
        if (data.status === "success") {
          setSchoolList(data.data);
        } else {
          Alert.alert("Error", "Failed to fetch schools.");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        Alert.alert("Network Error", "Could not connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* School Selection */}
        <View style={styles.upperSection}>
          <MaterialIcons
            name="school"
            size={50}
            color="#3f51b5"
            style={styles.icon}
          />
          <Text style={styles.heading}>Select your School</Text>

          <View
            style={[
              styles.pickerWrapper,
              isPickerFocused && styles.pickerFocused,
            ]}
          >
            {loading ? (
              <ActivityIndicator size="large" color="#3f51b5" />
            ) : (
              <Picker
                selectedValue={selectedSchool}
                onValueChange={(itemValue) => setSelectedSchool(itemValue)}
                style={styles.picker}
                dropdownIconColor="#3f51b5"
                onFocus={() => setIsPickerFocused(true)}
                onBlur={() => setIsPickerFocused(false)}
              >
                <Picker.Item label="Choose School" value="" />
                {schoolList.map((school, index) => (
                  <Picker.Item key={index} label={school} value={school} />
                ))}
                <Picker.Item label="Naagarjuna" value="Naagarjuna" />
                <Picker.Item label="St. Claret" value="St. Claret" />
                <Picker.Item label="ZPHS" value="ZPHS" />
              </Picker>
            )}
          </View>

          {selectedSchool && (
            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* School Registration */}
        <View style={styles.lowerSection}>
          <Text style={styles.subText}>
            Want to register your school in our App?
          </Text>

          <TouchableOpacity
            style={styles.registerBox}
            onPress={() => navigation.navigate("Register")}
            activeOpacity={0.7}
          >
            <MaterialIcons name="add-circle-outline" size={24} color="white" />
            <Text style={styles.registerText}>Register a School</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    marginTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    width: Platform.OS === "web" ? 500 : "100%",
    padding: 20,
  },
  upperSection: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lowerSection: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    marginBottom: 15,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  pickerWrapper: {
    width: Platform.OS === "web" ? 400 : "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
    overflow: "hidden",
  },
  pickerFocused: {
    borderColor: "#3f51b5",
    borderWidth: 2,
  },
  picker: {
    width: "auto",
    height: 50,
  },
  continueButton: {
    backgroundColor: "#3f51b5",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#555",
  },
  registerBox: {
    backgroundColor: "#4caf50",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  registerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#888",
    fontWeight: "bold",
  },
});
