import { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import useRecordingsStore from "../../hooks/useRecordingsStore";
import { setIsPlaying, setSelectedModel, setSelectedSound, setTransformedAudio } from '../../slice/AudioSlice';
import { loadRecordings } from '../../slice/RecordingsSlice';
import AIModelChooser from '../AIModelChooser';
import AudioPlayer from '../AudioPlayer';
import SoundSourceSelector from '../SoundSourceSelector';
import UploadButton from '../UploadButton';

export default function transmitRecordingScreen({ navigation }) {
    const dispatch = useDispatch();
    const { recordings } = useRecordingsStore();

    // 🌟 Récupération des états audio depuis le store Redux
    const { selectedSound, selectedModel, transformedAudio, isPlaying, currentlyPlayingUri } = useSelector(state => state.audio);

    // 🚀 Charger tous les enregistrements disponibles au lancement
    useEffect(() => {
        dispatch(loadRecordings());
    }, [dispatch]);

    // ✅ Callback appelé après téléchargement de l'audio transformé
    const handleUploadComplete = (uri) => {
        dispatch(setTransformedAudio(uri));
    };

    // 🎵 Mettre à jour le son actuellement sélectionné (source personnalisée)
    const handleSelectSound = (sound) => {
        dispatch(setSelectedSound(sound));
    };

    // ▶️ Démarrer ou arrêter la lecture d'un clip audio
    const handleAudioPlay = (uri) => {
        if (isPlaying && currentlyPlayingUri === uri) {
            dispatch(setIsPlaying({ isPlaying: false, uri: null }));
        } else {
            dispatch(setIsPlaying({ isPlaying: true, uri }));
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeHeader}>
                <Text style={styles.title}>Gestion des Enregistrements</Text>
            </SafeAreaView>


            <View style={styles.contentContainer}>
                <View style={styles.soundSelectorContainer}>
                    <SoundSourceSelector 
                        recordings={recordings}
                        selectedRecording={selectedSound}
                        onSelectSound={handleSelectSound}
                    />
                </View>

                <ScrollView style={styles.scrollableSection}>
                    <View style={styles.uploadSection}>
                        <Text style={styles.sectionTitle}>
                            {selectedSound 
                                ? `Son sélectionné: ${selectedSound.name}` 
                                : 'Aucun son sélectionné'}
                        </Text>

                        <AIModelChooser 
                            selectedModel={selectedModel}
                            setSelectedModel={(model) => dispatch(setSelectedModel(model))}
                        />

                        <UploadButton 
                            selectedRecording={selectedSound}
                            selectedModel={selectedModel}
                            onUploadComplete={handleUploadComplete}
                        />

                        {selectedSound && (
                            <AudioPlayer 
                                uri={selectedSound.uri}
                                title="Audio Original"
                                onPlay={() => handleAudioPlay(selectedSound.uri)}
                            />
                        )}

                        {transformedAudio && (
                            <AudioPlayer 
                                uri={transformedAudio}
                                title="Audio Transformé"
                                onPlay={() => handleAudioPlay(transformedAudio)}
                            />
                        )}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#121212',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#eee',
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    soundSelectorContainer: {
        height: 350,
        marginBottom: 10,
    },
    scrollableSection: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
    },
    emptyContainer: {
        padding: 20,
        backgroundColor: '#1e1e1e',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    emptyText: {
        fontSize: 16,
        color: '#bbb',
        fontStyle: 'italic',
    },
    uploadSection: {
        backgroundColor: '#1e1e1e',
        borderRadius: 8,
        padding: 16,
        marginTop: 5,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#222',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#eee',
    },
    safeHeader: {
  paddingTop: 16, // ou 32 selon les devices
  paddingHorizontal: 16,
  backgroundColor: '#121212',
},

});