import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import useAudioControl from '../hooks/useAudioControl';

export default function AudioPlayer({ uri, title, onPlay }) {
    const { playAudio, pauseAudio } = useAudioControl();
    const { isPlaying, currentlyPlayingUri } = useSelector(state => state.audio);

    // 🎧 Détermine si ce lecteur est actif (lecture en cours)
    const playing = isPlaying && currentlyPlayingUri === uri;

    // ▶️/⏸️ Lance ou met en pause la lecture du son
    const handlePlayPause = () => {
        if (playing) {
            pauseAudio();
        } else {
            playAudio(uri);
        }
        if (onPlay) onPlay();
    };

    return (
        <View style={styles.audioSection}>
            <View style={styles.headerContainer}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <Pressable 
                    style={[styles.controlButton, playing && styles.playingButton]}
                    onPress={handlePlayPause}
                >
                    <Ionicons 
                        name={playing ? "pause" : "play"} 
                        size={24} 
                        color={playing ? "#fff" : "#bbb"}
                    />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    audioSection: {
        marginTop: 16,
        padding: 16,
        backgroundColor: '#1e1e1e',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#4444ff',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        color: '#eee',
    },
    controlButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#333',
    },
    playingButton: {
        backgroundColor: '#4444ff',
    },
    button: {
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    playButton: {
        backgroundColor: '#44aa44',
        marginTop: 8,
        flex: 1,
        marginRight: 8,
    },
    stopButton: {
        backgroundColor: '#ff4444',
        marginTop: 8,
        flex: 1,
        marginRight: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    playbackInfo: {
        textAlign: 'center',
        marginTop: 8,
        fontSize: 14,
        color: '#bbb',
    },
});
