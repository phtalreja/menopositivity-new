import React, {useState} from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import { getCalendarData } from '../api/calendar'

export default function CalendarScreen() {
  type MarkedDates = { [x: string] : {startingDay: boolean, endingDay: boolean, color: string}};
  const [markedDates, setMarkedDates] = useState({});
  getCalendarData((dates: MarkedDates) => setMarkedDates(dates), (error) => console.log(error));

  return (
    <View style={styles.container}>
      <Calendar
        theme={styles.calendarTheme}
        style={{
          margin: 10,
          borderColor: 'gray',

        }} 
        markedDates={markedDates}
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
