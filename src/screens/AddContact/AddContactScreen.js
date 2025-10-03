import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useContacts } from '../../utils/ContactContext';
import { Colors, Fonts, Spacing, GlobalStyles } from '../../styles/globalStyles';

const AddContactScreen = ({ route, navigation }) => {
  const { addContact, updateContact } = useContacts();
  const editingContact = route.params?.contact;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  // Validation state
  const [errors, setErrors] = useState({});

  // Pre-fill form if editing
  useEffect(() => {
    if (editingContact) {
      setFirstName(editingContact.firstName || '');
      setLastName(editingContact.lastName || '');
      setEmail(editingContact.email || '');
      setCompany(editingContact.company || '');
      setPhone(editingContact.phone || '');
      setNotes(editingContact.notes || '');
    }
  }, [editingContact]);

  const validate = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const contactData = { firstName, lastName, email, company, phone, notes };

    try {
      if (editingContact) {
        await updateContact(editingContact.id, contactData);
        Alert.alert('Success', 'Contact updated successfully');
      } else {
        await addContact(contactData);
        Alert.alert('Success', 'Contact added successfully');
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: Spacing.md }}>
      {[
        { label: 'First Name', value: firstName, onChange: setFirstName, key: 'firstName' },
        { label: 'Last Name', value: lastName, onChange: setLastName, key: 'lastName' },
        { label: 'Email', value: email, onChange: setEmail, key: 'email', keyboardType: 'email-address' },
        { label: 'Company', value: company, onChange: setCompany, key: 'company' },
        { label: 'Phone', value: phone, onChange: setPhone, key: 'phone', keyboardType: 'phone-pad' },
        { label: 'Notes', value: notes, onChange: setNotes, key: 'notes', multiline: true },
      ].map((field) => (
        <View key={field.key} style={styles.inputContainer}>
          <Text style={styles.label}>{field.label}</Text>
          <TextInput
            style={[styles.input, errors[field.key] && styles.inputError]}
            value={field.value}
            onChangeText={field.onChange}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            keyboardType={field.keyboardType || 'default'}
            multiline={field.multiline || false}
          />
          {errors[field.key] && <Text style={styles.errorText}>{errors[field.key]}</Text>}
        </View>
      ))}

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        accessible
        accessibilityRole="button"
        accessibilityLabel={editingContact ? 'Update contact' : 'Add contact'}
      >
        <Text style={styles.submitButtonText}>{editingContact ? 'Update Contact' : 'Add Contact'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
  },
  inputContainer: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: Fonts.medium,
    marginBottom: Spacing.xs,
    color: Colors.text.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: Spacing.md,
    fontSize: Fonts.medium,
    backgroundColor: Colors.surface,
  },
  inputError: {
    borderColor: Colors.accent,
  },
  errorText: {
    color: Colors.accent,
    fontSize: Fonts.small,
    marginTop: Spacing.xs,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  submitButtonText: {
    color: Colors.text.light,
    fontSize: Fonts.medium,
    fontWeight: 'bold',
  },
});

export default AddContactScreen;
