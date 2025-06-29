import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function SaveRecordingModal({ visible, recordingName, onChangeRecordingName, onSave, onCancel }) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onCancel}
        >
            
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Sauvegarder l'enregistrement</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nom de l'enregistrement"
                        placeholderTextColor="#aaa"
                        value={recordingName}
                        onChangeText={onChangeRecordingName}
                    />
                    <View style={styles.modalButtons}>
                        <Pressable
                            style={[styles.modalButton, styles.cancelButton]}
                            onPress={onCancel}
                        >
                            <Text style={styles.cancelText}>Annuler</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.modalButton, styles.confirmButton]}
                            onPress={onSave}
                        >
                            <Text style={styles.confirmText}>Sauvegarder</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#1e1e1e',
        borderRadius: 8,
        padding: 20,
        width: '80%',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#eee',
    },
    input: {
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 4,
        padding: 10,
        marginBottom: 16,
        color: '#fff',
        backgroundColor: '#2a2a2a',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 4,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#333',
    },
    confirmButton: {
        backgroundColor: '#44aa44',
    },
    cancelText: {
        fontWeight: 'bold',
        color: '#ccc',
    },
    confirmText: {
        fontWeight: 'bold',
        color: '#fff',
    }
});
