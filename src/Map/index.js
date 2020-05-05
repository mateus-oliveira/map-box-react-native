import React, {Component} from 'react';
import {View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

import styles from './styles';

MapboxGL.setAccessToken(
    'pk.eyJ1IjoibWF0ZXVzLW9saXZlaXJhIiwiYSI6ImNrOXN3NWJsNzE5ZGgza3RyaG1zYXEwdmEifQ.bz9mJyJv9nZLs46d1NePcA',
);

import Geolocation from '@react-native-community/geolocation';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {latitude: -5, longitude: -35},
        };
    }

    componentDidMount() {
        Geolocation.getCurrentPosition(
            ({coords: {latitude, longitude}}) => {
                this.setState({
                    region: {
                        latitude,
                        longitude,
                        latitudeDelta: 0.0043,
                        longitudeDelta: 0.0024,
                    },
                });
            },
            () => {},
            {
                timeout: 20000,
                enableHighAccuracy: true,
                maximumAge: 10000,
            },
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <MapboxGL.MapView
                    centerCoordinate={[
                        this.state.region.latitude,
                        this.state.region.longitude,
                    ]}
                    style={styles.map}
                    showUserLocation
                />
            </View>
        );
    }
}
