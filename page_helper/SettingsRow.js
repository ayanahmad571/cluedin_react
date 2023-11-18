// components/SettingsRow.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CLUEDIN_DARK_SCHEME, CLUEDIN_THEME } from '../utils/constants';

const SettingsRow = ({ icon, title, description, onPress }) => {
  const iconCol = CLUEDIN_THEME.light_grey;

  return (
    <TouchableOpacity style={styles.rowContainer} onPress={onPress}>
      <View style={[styles.columnMid, { flex: 0.1 }]}>
        <Ionicons style={{ color: iconCol }} name={icon} size={16} />
      </View>
      <View style={[styles.column, styles.columnMid, { flex: 0.8 }]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={[styles.column, { flex: 0.1 }]}>
        <Ionicons name="chevron-forward-outline" size={16} style={{ color: iconCol }} />
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 10,
  },
  column: {
    alignItems: 'right',
  },
  columnMid: {
    alignItems: 'left',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: CLUEDIN_DARK_SCHEME.header_background_text,
  },
  description: {
    fontSize: 16,
    color: CLUEDIN_THEME.light_grey,
  },
};

export default SettingsRow;
