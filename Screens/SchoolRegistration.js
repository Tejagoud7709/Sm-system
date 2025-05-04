import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function SchoolRegistration() {
  const [formData, setFormData] = useState({
    schoolName: "",
    registrationNumber: "",
    schoolType: "",
    affiliation: "",
    state: "",
    district: "",
    city: "",
    pincode: "",
    photo: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setFormData({ ...formData, photo: result.assets[0].base64 });
    }
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value.trim(),
    });
  };

  const handleSubmit = async () => {
    if (loading) return;

    const requiredFields = [
      "schoolName",
      "registrationNumber",
      "schoolType",
      "affiliation",
      "state",
      "district",
      "city",
      "pincode",
    ];
    const emptyField = requiredFields.find((key) => !formData[key].trim());

    if (emptyField) {
      setError(`Please fill in the ${emptyField}`);
      return;
    } else {
      setError("");
    }

    try {
      setLoading(true);
      const BASE_URL =
        Platform.OS === "android" ? "http://192.168.31.141:5000" : "http://localhost:5000";

      const response = await fetch(`${BASE_URL}`/register-school, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setFormData({
          schoolName: "",
          registrationNumber: "",
          schoolType: "",
          affiliation: "",
          state: "",
          district: "",
          city: "",
          pincode: "",
          photo: null,
        });
        setError(""); // Clear any previous errors
      } else {
        setError(data.error || "Something went wrong!");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setError("Failed to submit registration.");
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <KeyboardAvoidingView
      style={styles.outer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Register a School</Text>

        <View style={styles.formCard}>
          {[
            {
              label: "School Name ",
              name: "schoolName",
              placeholder: "Enter school name",
            },
            {
              label: "Registration Number ",
              name: "registrationNumber",
              placeholder: "Enter registration number",
              keyboardType: "number-pad",
            },
            {
              label: "Type of School ",
              name: "schoolType",
              placeholder: "Public/Private/International",
            },
            {
              label: "Desired Affiliation ",
              name: "affiliation",
              placeholder: "CBSE/ICSE/State Board",
            },
            { label: "State ", name: "state", placeholder: "Enter state" },
            {
              label: "District ",
              name: "district",
              placeholder: "Enter district",
            },
            { label: "City ", name: "city", placeholder: "Enter city" },
            {
              label: "Pincode ",
              name: "pincode",
              placeholder: "Enter pincode",
              keyboardType: "number-pad",
              maxLength: 6,
            },
          ].map((field) => (
            <View key={field.name} style={styles.inputGroup}>
              <Text style={styles.label}>{field.label}</Text>
              <TextInput
                style={styles.input}
                placeholder={field.placeholder}
                placeholderTextColor="#B0B0B0"
                value={formData[field.name]}
                onChangeText={(text) => handleInputChange(field.name, text)}
                autoCapitalize="words"
                keyboardType={field.keyboardType || "default"}
                maxLength={field.maxLength || undefined}
              />
            </View>
          ))}
          <View style={styles.inputGroup}>
  <Text style={styles.label}>School Photo</Text>
   <View style={styles.photoRow}> 
    <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
      <Text style={{ color: "#3F51B5", fontWeight: "bold" }}>
        Pick a Photo
      </Text>
    </TouchableOpacity>
    {formData.photo && (
      <Image
        source={{ uri: `data:image/jpeg;base64,${formData.photo} `}}
        style={styles.photo}
      />
    )}
  </View> 
</View>

        </View>

        <TouchableOpacity
          style={[styles.submitButton, loading && { opacity: 0.6 }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <FontAwesome name="send" size={18} color="white" />
          <Text style={styles.submitButtonText}>
            {loading ? "Submitting..." : "Submit Registration"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: Platform.OS === "android" ? "stretch" : "center",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 25,
    width: Platform.OS === "web" ? 500 : "100%",
    paddingBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#555",
  },
  input: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#3F51B5",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3F51B5",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  photoButton: {
    padding: 10,
    borderWidth: 1,
    width:150,
    borderColor: "#3F51B5",
    borderRadius: 8,
    alignItems: "center",
  },
  photoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginLeft: Platform.OS === "android" ? 35 : 95,
  },  
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});