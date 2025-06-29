import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setConnected, setServerConfig } from '../../slice/ServerSlice';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { ipAddress, port } = useSelector(state => state.server);

  // 🛡️ Gérer la tentative de connexion au serveur Flask
  const handleConnect = async () => {
    if (!ipAddress) {
      Alert.alert('Adresse IP manquante', 'Veuillez entrer une adresse IP valide.');
      return;
    }

    console.log(`🔌 Tentative de connexion à http://${ipAddress}:${port}`);

    try {
      const response = await fetch(`http://${ipAddress}:${port}/`);
      if (!response.ok) throw new Error('Erreur de connexion au serveur');

      const data = await response.text();
      console.log('Connexion réussie 🌟:', data);
      dispatch(setServerConfig({ ip: ipAddress, port: port }));
      dispatch(setConnected(true));
    } catch (error) {
      console.error('Erreur de connexion ❌:', error);
      Alert.alert('Connexion échouée', "Impossible de se connecter au serveur. Vérifiez l'adresse IP et le port.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RAVES — Application Mobile d'Enregistrement et Transformation Audio</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Votre Adresse IP</Text>
        <TextInput
          style={styles.input}
          value={ipAddress}
          onChangeText={(text) => dispatch(setServerConfig({ ip: text, port }))}
          placeholder="192.168.1.1"
          placeholderTextColor="#888"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Votre Port</Text>
        <TextInput
          style={styles.input}
          value={port}
          onChangeText={(text) => dispatch(setServerConfig({ ip: ipAddress, port: text }))}
          placeholder="8000"
          placeholderTextColor="#888"
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.connectButton} onPress={handleConnect}>
          <Text style={styles.connectButtonText}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212',
    width: '100%',
    padding: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#eee',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#1e1e1e',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#ccc',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 3,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    width: '100%',
    backgroundColor: '#2a2a2a',
    color: '#fff',
  },
  connectButton: {
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#2979ff',
    borderRadius: 3,
    padding: 12,
    width: '100%',
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
