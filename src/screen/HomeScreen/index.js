import React, { Component } from 'react'
import { Animated, View, Easing, Text } from 'react-native'
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
        subscribeTimer: null,
        location: null,
        heading: { magHeading: null },
    };

    componentWillMount() {
        this._getLocationAsync()
    }

    componentDidMount() {
        this._launchAnimation()
        const timer = setInterval(() => {
            this._subscribe()
        }, 2000)

        setTimeout(() => {
            this.props.navigation.navigate('Home')
        }, 1500);
    }
    componentWillUnmount() {
        this._unsubscribe();
    }

    _getLocationAsync() {
        Permissions.askAsync(Permissions.LOCATION).then(res => {
            if (res.status !== 'granted') {
                return
            }
            Location.getCurrentPositionAsync({}).then(location => {
                this.setState({ location })
            })
            Location.getHeadingAsync().then(heading => {
                this.setState({ heading })
            })
        })
    }

    _subscribe = () => {
        this._getLocationAsync()
    }
    _unsubscribe = () => {
        clearInterval(this.state.subscribeTimer)
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
                    <Text>magHeading: {this.state.heading.magHeading}</Text>
                    <Text>trueHeading: {this.state.heading.trueHeading}</Text>
                </View>
            </View>
        );
    }

}
