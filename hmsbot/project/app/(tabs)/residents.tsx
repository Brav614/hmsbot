import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useHostelStore } from '../../store/hostelStore';
import { Plus, X } from 'lucide-react-native';

export default function ResidentsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [newResident, setNewResident] = useState({
    name: '',
    room: '',
    checkIn: '',
    checkOut: '',
    contact: '',
    email: '',
  });

  const { residents, addResident } = useHostelStore();

  const handleAddResident = () => {
    addResident({
      id: Date.now().toString(),
      ...newResident,
    });
    setModalVisible(false);
    setNewResident({
      name: '',
      room: '',
      checkIn: '',
      checkOut: '',
      contact: '',
      email: '',
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Residents</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}>
            <Plus size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {residents.map((resident) => (
          <View key={resident.id} style={styles.residentCard}>
            <Text style={styles.residentName}>{resident.name}</Text>
            <Text style={styles.residentDetails}>Room: {resident.room}</Text>
            <Text style={styles.residentDetails}>
              Check-in: {resident.checkIn}
            </Text>
            <Text style={styles.residentDetails}>
              Check-out: {resident.checkOut}
            </Text>
            <Text style={styles.residentDetails}>
              Contact: {resident.contact}
            </Text>
            <Text style={styles.residentDetails}>Email: {resident.email}</Text>
          </View>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Resident</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={24} color="#666666" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Name"
              value={newResident.name}
              onChangeText={(text) =>
                setNewResident({ ...newResident, name: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Room Number"
              value={newResident.room}
              onChangeText={(text) =>
                setNewResident({ ...newResident, room: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Check-in Date (YYYY-MM-DD)"
              value={newResident.checkIn}
              onChangeText={(text) =>
                setNewResident({ ...newResident, checkIn: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Check-out Date (YYYY-MM-DD)"
              value={newResident.checkOut}
              onChangeText={(text) =>
                setNewResident({ ...newResident, checkOut: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Contact Number"
              value={newResident.contact}
              onChangeText={(text) =>
                setNewResident({ ...newResident, contact: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={newResident.email}
              onChangeText={(text) =>
                setNewResident({ ...newResident, email: text })
              }
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAddResident}>
              <Text style={styles.submitButtonText}>Add Resident</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  addButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  residentCard: {
    backgroundColor: '#FFFFFF',
    margin: 10,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  residentName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1A1A1A',
  },
  residentDetails: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});