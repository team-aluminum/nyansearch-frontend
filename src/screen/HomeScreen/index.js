import React, { Component } from 'react'
import { Animated, View, Easing, Text } from 'react-native'
import { Accelerometer } from 'expo-sensors'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import styles from './style'

export class HomeScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    state = {
        circleSize: new Animated.Value(0),
        catpadDeg: new Animated.Value(0),
        logoView: new Animated.Value(0),
        accelerometerData: { x: 0, y: 0, z: 0 },
        location: null,
    };

    componentWillMount() {
    }

    componentDidMount() {
        this._launchAnimation()
        this._subscribe()
        this._getLocationAsync()

        setTimeout(() => {
            this.props.navigation.navigate('Home')
        }, 1500);
    }
    componentWillUnmount() {
        this._unsubscribe();
    }

    async _getLocationAsync() {
        const { status } = await Permissions.askAsync(Permissions.LOCATION)
        if (status !== 'granted') {
            return
        }
        const location = await Location.getCurrentPositionAsync({})
        this.setState({ location })
        console.log(this.state.location)
    }

    _subscribe = () => {
        this._subscription = Accelerometer.addListener(accelerometerData => {
            this.setState({ accelerometerData });
        });
        Accelerometer.setUpdateInterval(1000);
    }
    _unsubscribe = () => {
        if (this._subscription) {
            this._subscription.remove();
        }
        this._subscription = null;
    }

    _launchAnimation() {

        Animated.sequence([
            Animated.parallel([
                Animated.timing(this.state.circleSize, {
                    toValue: 994,
                    duration: 500,
                    easing: Easing.out(Easing.ease)
                }),
                Animated.timing(this.state.logoView, {
                    toValue: 1,
                    duration: 500,
                    easing: Easing.out(Easing.ease)
                }),
            ]),
            Animated.timing(this.state.catpadDeg, {
                toValue: 1,
                duration: 100,
                easing: Easing.out(Easing.ease)
            }),
            Animated.timing(this.state.catpadDeg, {
                toValue: -1,
                duration: 100,
                easing: Easing.out(Easing.ease)
            }),
            Animated.timing(this.state.catpadDeg, {
                toValue: 1,
                duration: 100,
                easing: Easing.out(Easing.ease)
            }),
            Animated.timing(this.state.catpadDeg, {
                toValue: -1,
                duration: 100,
                easing: Easing.out(Easing.ease)
            }),
            Animated.timing(this.state.catpadDeg, {
                toValue: 0,
                duration: 50,
                easing: Easing.out(Easing.ease)
            })
        ]).start();

    }

    render() {

        let { x, y, z } = this.state.accelerometerData;
        let {circleSize, logoView, catpadDeg} = this.state;
        let catpadDegValue = catpadDeg.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: ['-15deg', '0deg', '15deg']
        });
        let logoMargin = logoView.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 100]
        });

        return (
            <View style={styles.container}>
                <Animated.View style={{
                    width: circleSize,
                    height: circleSize,
                    borderRadius: circleSize,
                    ...styles.circle
                }}/>
                <View style={styles.catpad}>
                    <Animated.Image style={{
                        transform: [{rotate: catpadDegValue}],
                        marginBottom: logoMargin,
                    }} source={require('../../../assets/catpad.png')}/>
                </View>
                <View style={{marginTop: 70}}>
                    <Text>x: {x.toFixed(3)}</Text>
                    <Text>y: {y.toFixed(3)}</Text>
                    <Text>z: {z.toFixed(3)}</Text>
                </View>
            </View>
        );
    }

}
