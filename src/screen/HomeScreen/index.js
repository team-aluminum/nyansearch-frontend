import React, {Component} from 'react';
import {Animated, View, Easing} from 'react-native'
import styles from './style'
import PlayButton from '../../component/PlayButton'
import CatView from '../../component/CatView'

export class HomeScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    state = {
        circleSize: new Animated.Value(0),
        catpadDeg: new Animated.Value(0),
        logoView: new Animated.Value(0),
    };

    componentDidMount() {
        this._launchAnimation();
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

                <CatView cats={cats}/>

                <View style={styles.catpad}>
                    <Animated.Image style={{
                        transform: [{rotate: catpadDegValue}],
                        marginBottom: logoMargin,
                    }} source={require('../../../assets/catpad.png')}/>
                </View>

                <View style={styles.playButton}>
                    <PlayButton />
                </View>

            </View>
        );
    }

}

// run Example
const cats = [
    {id: 1, deg: 0, size: 2}, // left
    {id: 2, deg: 90, size: 1}, // top
    {id: 3, deg: 180, size: 1}, // right
    {id: 4, deg: 270, size: 3}, // bottom
    {id: 5, deg: 320, size: 1}, // custom
];
