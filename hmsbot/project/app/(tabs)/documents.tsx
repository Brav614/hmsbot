import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useHostelStore } from '../../store/hostelStore';

export default function DocumentsScreen() {
  const residents = useHostelStore((state) => state.residents);
  const [selectedResident, setSelectedResident] = useState(null);

  const generateProofOfResidence = async (resident) => {
    const html = `
      <html>
        <head>
          <style>
            body {
              font-family: 'Helvetica', sans-serif;
              padding: 40px;
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .title {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .content {
              margin-top: 20px;
              line-height: 1.6;
            }
            .footer {
              margin-top: 50px;
              text-align: center;
            }
            .signature-line {
              margin-top: 100px;
              border-top: 1px solid #333;
              width: 200px;
              margin-left: auto;
              margin-right: auto;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">PROOF OF RESIDENCE</div>
            <div>Hostel Management System</div>
          </div>
          
          <div class="content">
            <p>This is to certify that:</p>
            
            <p><strong>${resident.name}</strong></p>
            
            <p>is a resident at our hostel facility with the following details:</p>
            
            <p>
              Room Number: ${resident.room}<br>
              Check-in Date: ${resident.checkIn}<br>
              Check-out Date: ${resident.checkOut}<br>
              Contact: ${resident.contact}<br>
              Email: ${resident.email}
            </p>
            
            <p>This document serves as official proof of residence for the above-mentioned individual.</p>
          </div>
          
          <div class="footer">
            <div class="signature-line">
              <p>Authorized Signature</p>
            </div>
            
            <p>Date: ${new Date().toLocaleDateString()}</p>
          </div>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Share Proof of Residence',
        UTI: 'com.adobe.pdf',
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Documents</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Generate Proof of Residence</Text>
        <Text style={styles.description}>
          Select a resident to generate their proof of residence document.
        </Text>

        {residents.map((resident) => (
          <TouchableOpacity
            key={resident.id}
            style={styles.residentCard}
            onPress={() => generateProofOfResidence(resident)}>
            <Text style={styles.residentName}>{resident.name}</Text>
            <Text style={styles.residentRoom}>Room {resident.room}</Text>
          </TouchableOpacity>
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
  section: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1A1A1A',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
  },
  residentCard: {
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  residentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  residentRoom: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
});