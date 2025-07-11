import { StyleSheet, Text, View } from 'react-native';
import RecordingsListUnified from '../RecordingsList';

export default function StudioPage({ recordings, selectedId, onSelectRecording }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enregistrements</Text>
      {recordings && recordings.length > 0 ? (
        <View style={styles.recordingsContainer}>
          <RecordingsListUnified
            recordings={recordings}
            selectable={true}
            selectedId={selectedId}
            onSelectRecording={onSelectRecording}
          />
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Aucun enregistrement disponible</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#121212', // Fond sombre
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff', // Texte clair
  },
  recordingsContainer: {
    flex: 1,
  },
  emptyContainer: {
    padding: 20,
    backgroundColor: '#1e1e1e', // Conteneur sombre
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyText: {
    fontSize: 16,
    color: '#888', // Texte gris clair
    fontStyle: 'italic',
  },
});
