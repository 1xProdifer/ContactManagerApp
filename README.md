# Contact Manager App

## Overview
A fully functional **React Native Contact Manager App** that allows users to:
- View, search, add, edit, and delete contacts
- Mark contacts as favorites
- Access contact details with quick actions (call, message, edit, delete)
- Enjoy a responsive and accessible interface

Built with **React Native**, **Context API**, and **AsyncStorage** for persistent data.

---

## Features
- **Contact List**
  - Search by name, company, or email
  - Sort by name, company, or recently added
  - Favorites shown at the top
- **Add/Edit Contact**
  - Input validation for required fields
  - Pre-fill data when editing
- **Contact Details**
  - View full contact information
  - Buttons for call, SMS, edit, and delete
- **Accessibility**
  - Screen reader friendly
  - Proper roles, labels, and hints
- **Performance Optimizations**
  - Memoized components
  - FlatList optimizations (`getItemLayout`, `initialNumToRender`, `windowSize`)
  - `useMemo` and `useCallback` for filtering and event handlers

---

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/1xProdifer/ContactManagerApp.git
cd ContactManagerApp
```

### 2. Install dependencies
```bash
npm install
```

###3. Run the app
```bash
iOS (Mac required):
npx react-native run-ios
Android:
npx react-native run-android
```

---

## Project Structure

ContactManagerApp/
├─ src/
│ ├─ components/common/ # Reusable UI components
│ ├─ screens/ # App screens (Add/Edit/List/Details)
│ ├─ data/ # Sample contacts and helper functions
│ ├─ utils/ # Context API and helper utilities
│ └─ styles/ # Global styles
├─ App.js # Main app entry
├─ package.json
└─ README.md

---

## Usage
### Viewing Contacts
- Launch the app to see the contact list  
- Use the **search bar** to filter by name, company, or email  
- Contacts marked as favorites appear at the top  

### Adding a Contact
- Tap the **Add** button (floating button)  
- Fill in required fields (first name, last name, email, phone)  
- Optional fields: company, notes  
- Tap **Add Contact** to save  

### Editing a Contact
- Tap a contact to open the **Details screen**  
- Tap **Edit** to update contact information  
- Fields will be pre-filled with current data  
- Tap **Update Contact** to save changes  

### Deleting a Contact
- Open the contact in **Details screen**  
- Tap **Delete** to remove the contact permanently  

### Favorites
- Toggle the star icon directly in the contact list  
- Favorite contacts will appear at the top  

---

## Accessibility
- All buttons and inputs have `accessibilityLabel` and `accessibilityRole`  
- Screen reader tested on Android emulator  
- High contrast and readable fonts for better visibility  

---

## Contributing
### Steps
1. Fork the repository and create a new branch  
2. Make changes and commit with descriptive messages  
3. Open a pull request for review  

---

## License
This project is licensed under the **MIT License**.

---

## Author
**Adhyan Chandhoke**  
[GitHub Profile](https://github.com/1xProdifer)
