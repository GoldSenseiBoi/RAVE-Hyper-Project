import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SampleSelector({ onSelectSound, selectedRecording }) {
  const [selectedSoundId, setSelectedSoundId] = useState(null);

  const defaultSounds = [
    { id: 'default1', name: 'Bell', assetModule: require('../../assets/audio/bell.wav') },
    { id: 'default2', name: 'Clap', assetModule: require('../../assets/audio/clap.wav') },
    { id: 'default3', name: 'Crash', assetModule: require('../../assets/audio/crash.wav') },
    { id: 'default4', name: 'Hihat', assetModule: require('../../assets/audio/hihat.wav') },
    { id: 'default5', name: 'Kick', assetModule: require('../../assets/audio/kick.wav') },
    { id: 'default6', name: 'Openhat', assetModule: require('../../assets/audio/openhat.wav') },
    { id: 'default7', name: 'Ride', assetModule: require('../../assets/audio/ride.wav') },
    { id: 'default8', name: 'Rim', assetModule: require('../../assets/audio/rim.wav') },
    { id: 'default9', name: 'Snare', assetModule: require('../../assets/audio/snare.wav') },
  ];

  // 🔄 Synchronise la selection depuis l'extérieur
  useEffect(() => {
    if (selectedRecording && selectedRecording.id.startsWith('default-')) {
      const soundName = selectedRecording.id.split('default-')[1];
      const matchingSound = defaultSounds.find(sound => 
        sound.name.toLowerCase() === soundName
      );
      if (matchingSound) {
        setSelectedSoundId(matchingSound.id);
      }
    } else {
      setSelectedSoundId(null);
    }
  }, [selectedRecording]);

  // 🎵 Copie un asset local dans le cache et crée l'objet son utilisable
  const importSoundFromAssets = async (assetModule, name, id) => {
    try {
      setSelectedSoundId(id);
      const soundUri = `${FileSystem.cacheDirectory}sounds/${name.toLowerCase()}.wav`;

      const dirInfo = await FileSystem.getInfoAsync(`${FileSystem.cacheDirectory}sounds`);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(`${FileSystem.cacheDirectory}sounds`, { intermediates: true });
      }

      const fileInfo = await FileSystem.getInfoAsync(soundUri);
      if (!fileInfo.exists) {
        const asset = await Asset.loadAsync(assetModule);
        const assetUri = asset[0].localUri;
        await FileSystem.copyAsync({ from: assetUri, to: soundUri });
      }

      let finalUri = soundUri.startsWith('file://') ? soundUri.substring(7) : soundUri;
      const soundObj = {
        id: `default-${name.toLowerCase()}`,
        name: name,
        uri: finalUri
      };

      onSelectSound(soundObj);
    } catch (error) {
      console.error(`Erreur ${name} :`, error);
      Alert.alert('Erreur', `Impossible de charger ${name}`);
    }
  };

  const isSelected = (id) => id === selectedSoundId;

  const renderSoundItem = ({ item }) => {
    const selected = isSelected(item.id);
    return (
      <View style={styles.soundItemContainer}>
        <TouchableOpacity
          style={[styles.soundItem, selected && styles.selectedSoundItem]}
          onPress={() => importSoundFromAssets(item.assetModule, item.name, item.id)}
        >
          <Text style={[styles.soundName, selected && styles.selectedSoundText]}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sons par défaut</Text>
      <View style={styles.soundItemsContainer}>
        <FlatList
          data={defaultSounds}
          renderItem={renderSoundItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#eee'
  },
  soundItemsContainer: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 10,
  },
  soundItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  soundItem: {
    flex: 1,
    padding: 15,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    marginRight: 8,
  },
  selectedSoundItem: {
    backgroundColor: '#1e1e2f',
    borderColor: '#4FC3F7',
    borderWidth: 1,
  },
  soundName: {
    fontSize: 16,
    color: '#ccc',
  },
  selectedSoundText: {
    color: '#4FC3F7',
    fontWeight: 'bold',
  },
  playButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
  },
  playingButton: {
    backgroundColor: '#3498db',
  },
  playButtonText: {
    fontSize: 18,
  },
});
