import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { fetchEmergencyHistory } from '../services/api';

const EmergencyHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      const data = await fetchEmergencyHistory();
      setHistory(data);
    };

    loadHistory();
  }, []);

  return (
    <FlatList
      data={history}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View>
          <Text>{item.date}</Text>
          <Text>{item.details}</Text>
        </View>
      )}
    />
  );
};

export default EmergencyHistory;
