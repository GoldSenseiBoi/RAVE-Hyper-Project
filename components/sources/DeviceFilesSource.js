import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DeviceFilesSource({ onSelectSound }) {
  // Fonction pour sélectionner un fichier audio depuis l'appareil
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: true,
      });

      // Vérifier si l'utilisateur a bien sélectionné un fichier
      if (!result.canceled) {
        const file = result.assets[0];

        // Générer un nom de fichier propre pour le cache
        const fileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
        const deviceSoundUri = `${FileSystem.cacheDirectory}device_sounds/${fileName}`;

        // Créer le dossier device_sounds s'il n'existe pas déjà
        const dirInfo = await FileSystem.getInfoAsync(`${FileSystem.cacheDirectory}device_sounds`);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(`${FileSystem.cacheDirectory}device_sounds`, { intermediates: true });
        }

        // Copier le fichier sélectionné dans le cache de l'application
        await FileSystem.copyAsync({
          from: file.uri,
          to: deviceSoundUri
        });

        // Nettoyer l'URI en supprimant le préfixe "file://"
        let finalUri = deviceSoundUri.startsWith('file://') ? deviceSoundUri.substring(7) : deviceSoundUri;

        // Créer un objet de son compatible avec les autres composants
        onSelectSound({
          id: 'device-' + Date.now(),
          name: file.name,
          uri: finalUri
        });
      }
    } catch (err) {
      console.error('Erreur lors de la sélection du fichier:', err);
      Alert.alert('Erreur', 'Impossible de sélectionner le fichier audio');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fichiers de l'appareil</Text>
      <TouchableOpacity style={styles.pickButton} onPress={pickDocument}>
        <Text style={styles.pickButtonText}>Sélectionner un fichier audio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
  },
  pickButton: {
    backgroundColor: '#3b82f6',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  pickButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedFileContainer: {
    padding: 15,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileInfoContainer: {
    flex: 1,
  },
  selectedFileName: {
    fontSize: 16,
    color: '#ffffff',
  },
  playButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    marginLeft: 10,
  },
  playingButton: {
    backgroundColor: '#3b82f6',
  },
  playButtonText: {
    fontSize: 18,
    color: '#ffffff',
  },
});