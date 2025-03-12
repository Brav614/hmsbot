import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

export default function SettingsScreen() {
  const settingsOptions = [
    {
      title: 'Profile',
      items: [
        { label: 'Account Information', action: () => {} },
        { label: 'Change Password', action: () => {} },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { label: 'Notifications', action: () => {} },
        { label: 'Language', action: () => {} },
        { label: 'Theme', action: () => {} },
      ],
    },
    {
      title: 'System',
      items: [
        { label: 'About', action: () => {} },
        { label: 'Privacy Policy', action: () => {} },
        { label: 'Terms of Service', action: () => {} },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      {settingsOptions.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.items.map((item, itemIndex) => (
            <TouchableOpacity
              key={itemIndex}
              style={styles.option}
              onPress={item.action}>
              <Text style={styles.optionText}>{item.label}</Text>
              <ChevronRight size={20} color="#666666" />
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  optionText: {
    fontSize: 16,
    color: '#1A1A1A',
  },
});