import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import useAudioControl from '../hooks/useAudioControl';

export default function RecordingItem({ recording, onDelete, selectable = false, isSelected = false, onSelect = null }) {
  const { playAudio, pauseAudio } = useAudioControl();
  const { isPlaying, currentlyPlayingUri } = useSelector(state => state.audio);

  // 🎧 Vérifie si ce fichier est en cours de lecture
  const playing = isPlaying && currentlyPlayingUri === recording.uri;

  // ▶️/⏸️ Lance ou interrompt la lecture
  const togglePlayback = () => {
    if (playing) {
      pauseAudio();
    } else {
      playAudio(recording.uri);
    }
  };

  // 🔢 Gère la sélection d'élément si activée
  const handleItemPress = () => {
    if (selectable && onSelect) {
      onSelect(recording.id);
    }
  };

  return (
    <Pressable 
      style={[styles.recordingItem, selectable && isSelected && styles.selectedItem]}
      onPress={handleItemPress}
    >
      <View style={styles.recordingInfo}>
        <View style={styles.textContainer}>
          <Text style={styles.recordingName}>{recording.name}</Text>
          <Text style={styles.recordingDate}>{recording.date}</Text>
        </View>
      </View>

      <View style={styles.controlsContainer}>
        {selectable && (
          <View style={styles.selectionIndicator}>
            <Text style={styles.selectionText}>{isSelected ? '✓' : '○'}</Text>
          </View>
        )}

        {!selectable && (
          <View style={styles.recordingControls}>
            <Pressable 
              style={[styles.controlButton, playing && styles.playingButton]}
              onPress={togglePlayback}
            >
              <Ionicons 
                name={playing ? "pause" : "play"} 
                size={20} 
                color={playing ? '#fff' : '#bbb'}
              />
            </Pressable>

            {onDelete && (
              <Pressable 
                style={[styles.controlButton, styles.deleteButton]}
                onPress={() => onDelete(recording.id)}
              >
                <Ionicons name="trash-outline" size={20} color="#ff6666" />
              </Pressable>
            )}
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  recordingItem: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: '#2c2c3c',
    borderColor: '#4444ff',
    borderWidth: 1,
  },
  recordingInfo: {
    flex: 1,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  recordingName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#eee',
  },
  recordingDate: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 4,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordingControls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  controlButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#333',
    marginLeft: 8,
  },
  deleteButton: {
    backgroundColor: '#3c1e1e',
  },
  playingButton: {
    backgroundColor: '#4444ff',
  },
  selectionIndicator: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#666',
  },
  selectionText: {
    fontSize: 16,
    color: '#bbb',
  },
});
