import React, { Component } from 'react';
import { Animated, StyleSheet, View, Easing} from 'react-native'

export class LunchScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        circleSize: new Animated.Value(0),
        catpadDeg: new Animated.Value(0),
        logoView:  new Animated.Value(0),
    };

    componentDidMount() {

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

        setTimeout(() => {
            this.props.navigation.navigate('Home')
        }, 1500);

    }

    render() {

        let { circleSize, logoView, catpadDeg } = this.state;
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
                }} />
                <Animated.Image style={{
                    transform: [{rotate: catpadDegValue}],
                    marginBottom: logoMargin,
                    ...styles.catpad
                }} source={require('../../../assets/catpad.png')} />
            </View>
        );
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#414143',
    },
    circle: {
        backgroundColor: '#E1DCD9',
        position: 'absolute',
    },
    catpad: {

    }

});
