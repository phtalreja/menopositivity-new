import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default function CalendarScreen() {
  return (
    <View style={styles.container}>
      <Calendar
        theme={styles.calendarTheme}
        style={{
          margin: 10,
          borderColor: 'gray',

        }} 
        markedDates={{
          '2020-08-20': {startingDay: true, color: 'orange', endingDay: true},
          '2020-08-22': {selected: true, startingDay: true, color: 'teal'},
          '2020-08-23': {selected: true, endingDay: true, color: 'teal'},
          '2020-08-04': {startingDay: true, color: 'lightgreen', endingDay: true}
        }}
        // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
        markingType={'period'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    justifyContent: 'space-around',
  },
  calendarTheme: {
    backgroundColor: '#ffffff00',
  },
});
