import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function ModelSelector({ selectedModel, setSelectedModel, onModelsLoaded }) {
    const [availableModels, setAvailableModels] = useState([]);
    const [loadingModels, setLoadingModels] = useState(false);
    const { connected, ipAddress, port } = useSelector(state => state.server);

    // 🔍 Récupération des modèles disponibles à partir du serveur Flask
    const fetchAvailableModels = async () => {
        setLoadingModels(true);
        try {
            const serverAddress = `http://${ipAddress}:${port}`;
            const response = await fetch(`${serverAddress}/getmodels`);

            if (response.ok) {
                const data = await response.json();
                console.log('Modèles disponibles:', data);

                if (data.models && Array.isArray(data.models)) {
                    const formattedModels = data.models.map(model => {
                        const displayName = model.endsWith('.onnx') ? model.slice(0, -5) : model;
                        return { label: displayName, value: model };
                    });

                    setAvailableModels(formattedModels);

                    if (formattedModels.length > 0 && !selectedModel) {
                        setSelectedModel(formattedModels[0].value);
                    }

                    if (onModelsLoaded) {
                        onModelsLoaded(formattedModels);
                    }
                }
            } else {
                console.error('Erreur lors de la récupération des modèles:', response.status);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des modèles:', error);
        } finally {
            setLoadingModels(false);
        }
    };

    // 🎓 Informer le serveur du modèle sélectionné
    const selectModelOnServer = async (modelName) => {
        if (!modelName) return false;

        try {
            const serverAddress = `http://${ipAddress}:${port}`;
            console.log('Tentative de sélection du modèle:', modelName);
            const response = await fetch(`${serverAddress}/selectModel/${modelName}`);

            if (response.ok) {
                const result = await response.text();
                console.log('Modèle sélectionné:', result);
                return true;
            } else {
                console.error('Erreur lors de la sélection du modèle:', response.status);
                return false;
            }
        } catch (error) {
            console.error('Erreur lors de la sélection du modèle:', error);
            return false;
        }
    };

    // ⏰ Charger les modèles disponibles à la connexion
    useEffect(() => {
        if (connected) fetchAvailableModels();
    }, [connected]);

    // ⚖️ Notifier le serveur du changement de modèle
    useEffect(() => {
        if (selectedModel) selectModelOnServer(selectedModel);
    }, [selectedModel]);

    return (
        <View style={styles.pickerContainer}>
            <Text style={styles.label}>Modèle de transformation :</Text>
            {loadingModels ? (
                <ActivityIndicator size="small" color="#8888ff" style={{ marginVertical: 10 }} />
            ) : (
                <Picker
                    selectedValue={selectedModel}
                    onValueChange={(value) => setSelectedModel(value)}
                    style={styles.picker}
                    enabled={availableModels.length > 0}
                    dropdownIconColor="#eee"
                >
                    {availableModels.length === 0 ? (
                        <Picker.Item label="Aucun modèle disponible" value="" enabled={false} />
                    ) : (
                        availableModels.map((model) => (
                            <Picker.Item key={model.value} label={model.label} value={model.value} />
                        ))
                    )}
                </Picker>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    pickerContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#eee',
    },
    picker: {
        backgroundColor: '#1e1e1e',
        borderRadius: 8,
        color: '#fff',
    },
});
