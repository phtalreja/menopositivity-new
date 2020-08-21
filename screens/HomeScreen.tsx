import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { LineChart } from 'react-native-chart-kit';

import Colors from '../constants/Colors';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

const sample_data = {
  labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  datasets: [
    {
      data: [6.5, 7.0, 8.2, 6.1, 9.2, 7.0, 7.75]
    }
  ]
};

const sample_data_sleep = {
  labels: ["Sun", "Mon", "Tue"],
  datasets: [
    {
      data: [0, 1, -1, ],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`
    }
  ]
};

export default function HomeScreen() {
  return (
    <ScrollView>
      
      <View>
        <Card title="Hot Flashes">
          <LineChart
            data = {sample_data}
            width = {300}
            height = {200}
            chartConfig={{
              backgroundGradientFrom: '#9b63f8',
              backgroundGradientTo: '#809ffc',
              backgroundGradientToOpacity: .5,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              propsForDots: {
                r: "6",
                strokeWidth: "2",
              }
            }}
          >

          </LineChart>
        </Card>

        <Card title="Your Top Triggers">
            <Text>Stress, Caffeine, Alcohol</Text>
        </Card>

        <Card title="Sleep Report">
        <LineChart
            data = {sample_data_sleep}
            width = {300}
            height = {200}
            chartConfig={{
              backgroundGradientFrom: '#9b63f8',
              backgroundGradientTo: '#809ffc',
              backgroundGradientToOpacity: .5,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              propsForDots: {
                r: "6",
                strokeWidth: "2",
              }
            }}
            bezier
          />
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
