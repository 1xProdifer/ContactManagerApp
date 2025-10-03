import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useContacts } from '../../utils/ContactContext';
import { Colors, Fonts, Spacing, GlobalStyles } from '../../styles/globalStyles';
import { formatContactName } from '../../data/contactsData';

const ContactDetailsScreen = ({ route, navigation }) => {
  const { contactId } = route.params;
  const { contacts, toggleFavorite, deleteContact } = useContacts();

  const contact = useMemo(
    () => contacts.find((c) => c.id === contactId),
    [contacts, contactId]
  );

  if (!contact) {
    return (
      <View style={[GlobalStyles.container, GlobalStyles.centered]}>
        <Text style={{ color: Colors.text.secondary }}>Contact not found</Text>
      </View>
    );
  }

  const fullName = formatContactName(contact);

  const handleFavoritePress = async () => {
    await toggleFavorite(contact.id);
  };

  const handleCallPress = (phoneNumber) => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) Linking.openURL(url);
      else Alert.alert('Error', 'Phone calls are not supported on this device');
    });
  };

  const handleMessagePress = (phoneNumber) => {
    const url = `sms:${phoneNumber}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) Linking.openURL(url);
      else Alert.alert('Error', 'SMS is not supported on this device');
    });
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Contact",
      "Are you sure you want to delete this contact?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteContact(contact.id);
            Alert.alert("Deleted", "Contact has been deleted");
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: Spacing.md }}>
      {/* Name and Favorite */}
      <View style={styles.header}>
        <Text style={styles.name}>{fullName}</Text>
        <TouchableOpacity
          onPress={handleFavoritePress}
          accessible
          accessibilityRole="button"
          accessibilityLabel={contact.favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Icon
            name={contact.favorite ? 'star' : 'star-border'}
            size={28}
            color={contact.favorite ? Colors.secondary : Colors.text.secondary}
          />
        </TouchableOpacity>
      </View>

      {/* Contact Details */}
      <View style={styles.detailRow}>
        <Icon name="email" size={20} color={Colors.text.secondary} />
        <Text style={styles.detailText}>{contact.email || 'No email provided'}</Text>
      </View>

      <View style={styles.detailRow}>
        <Icon name="business" size={20} color={Colors.text.secondary} />
        <Text style={styles.detailText}>{contact.company || 'No company provided'}</Text>
      </View>

      <View style={styles.detailRow}>
        <Icon name="phone" size={20} color={Colors.text.secondary} />
        <Text style={styles.detailText}>{contact.phone || 'No phone provided'}</Text>
        {contact.phone && (
          <View style={styles.actionButtons}>
            <TouchableOpacity onPress={() => handleCallPress(contact.phone)} style={styles.actionButton}>
              <Icon name="phone" size={20} color={Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleMessagePress(contact.phone)} style={styles.actionButton}>
              <Icon name="message" size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.detailRow}>
        <Icon name="note" size={20} color={Colors.text.secondary} />
        <Text style={styles.detailText}>{contact.notes || 'No notes provided'}</Text>
      </View>

      {/* Edit Button */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('AddContact', { contact })}
        accessible
        accessibilityRole="button"
        accessibilityLabel="Edit contact"
      >
        <Icon name="edit" size={24} color={Colors.text.light} />
        <Text style={styles.editButtonText}>Edit Contact</Text>
      </TouchableOpacity>

      {/* Delete Button */}
      <TouchableOpacity
        style={[styles.editButton, { backgroundColor: Colors.accent }]} // red button
        onPress={handleDelete}
        accessible
        accessibilityRole="button"
        accessibilityLabel="Delete contact"
      >
        <Icon name="delete" size={24} color={Colors.text.light} />
        <Text style={styles.editButtonText}>Delete Contact</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  name: {
    fontSize: Fonts.xlarge,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  detailText: {
    fontSize: Fonts.medium,
    color: Colors.text.secondary,
    marginLeft: Spacing.sm,
    flex: 1,
    flexWrap: 'wrap',
  },
  actionButtons: {
    flexDirection: 'row',
    marginLeft: Spacing.md,
  },
  actionButton: {
    marginLeft: Spacing.sm,
    padding: Spacing.xs,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 8,
    marginTop: Spacing.lg,
  },
  editButtonText: {
    color: Colors.text.light,
    fontSize: Fonts.medium,
    fontWeight: 'bold',
    marginLeft: Spacing.sm,
  },
});

export default ContactDetailsScreen;


