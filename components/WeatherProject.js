/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground
} from "react-native";
import Forecast from "./Forecast";
import OpenWeatherMap from "../open_weather_map";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
export default class WeatherProject extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { zip: "", forecast: null };
  }

  handleTextChange = event => {
    let zip = event.nativeEvent.text;
    OpenWeatherMap.fetchForecast(zip).then(forecast => {
      console.log(forecast);
      this.setState({ forecast: forecast });
    });
  };

  render() {
    let content = null;
    if (this.state.forecast !== null) {
      content = (
        <Forecast
          main={this.state.forecast.main}
          description={this.state.forecast.description}
          temp={this.state.forecast.temp}
        />
      );
    }
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../Resources/flowers.png")}
          resizeMode="cover"
          style={styles.backdrop}
        >
          <View style={styles.overlay}>
            <View style={styles.row}>
              <Text style={styles.mainText}>Current weather for</Text>
              <View style={styles.zipContainer}>
                <TextInput
                  style={[styles.zipCode, styles.mainText]}
                  onSubmitEditing={event => this.handleTextChange(event)}
                />
              </View>
            </View>
            {content}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30
  },
  backdrop: { flex: 1, flexDirection: "column" },
  overlay: {
    paddingTop: 5,
    backgroundColor: "#000000",
    opacity: 0.5,
    flexDirection: "column",
    alignItems: "center"
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "flex-start",
    padding: 30
  },
  zipContainer: {
    height: 20,
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3
  },
  zipCode: { flex: 1, flexBasis: 1, width: 50 },
  mainText: { color: "#FFFFFF", height: 40 }
});
