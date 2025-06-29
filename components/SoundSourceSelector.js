import { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import DefaultSoundsSource from './sources/DefaultSoundsSource';
import DeviceFilesSource from './sources/DeviceFilesSource';
import RecordingsSource from './sources/RecordingsSource';

export default function SoundSourceSelector({ recordings, selectedRecording, onSelectSound }) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'default', title: 'Sons par d\u00e9faut' },
    { key: 'recordings', title: 'Enregistrements' },
    { key: 'device', title: 'Appareil' },
  ]);

  const renderScene = SceneMap({
    default: () => <DefaultSoundsSource onSelectSound={onSelectSound} selectedRecording={selectedRecording} />,
    recordings: () => <RecordingsSource 
                        recordings={recordings} 
                        selectedId={selectedRecording ? selectedRecording.id : null}
                        onSelectRecording={(id) => {
                          const recording = recordings.find(rec => rec.id === id);
                          onSelectSound(recording);
                        }}
                      />,
    device: () => <DeviceFilesSource onSelectSound={onSelectSound} />,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
      activeColor="#4FC3F7"
      inactiveColor="#aaa"
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
      renderTabBar={renderTabBar}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  tabBar: {
    backgroundColor: '#1e1e1e',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  indicator: {
    backgroundColor: '#4FC3F7',
    height: 3,
  },
  tabLabel: {
    fontWeight: '500',
    textTransform: 'none',
    color: '#eee',
  },
});