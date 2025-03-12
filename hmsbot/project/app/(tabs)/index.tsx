import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useHostelStore } from '../../store/hostelStore';

export default function Dashboard() {
  const residents = useHostelStore((state) => state.residents);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hostel Dashboard</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{residents.length}</Text>
          <Text style={styles.statLabel}>Total Residents</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {residents.filter((r) => new Date(r.checkOut) > new Date()).length}
          </Text>
          <Text style={styles.statLabel}>Active Residents</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {residents.slice(0, 5).map((resident) => (
          <View key={resident.id} style={styles.activityItem}>
            <Text style={styles.residentName}>{resident.name}</Text>
            <Text style={styles.roomNumber}>Room {resident.room}</Text>
          </View>
        ))}
      </View>
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
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  section: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1A1A1A',
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  residentName: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  roomNumber: {
    fontSize: 16,
    color: '#666666',
  },
});