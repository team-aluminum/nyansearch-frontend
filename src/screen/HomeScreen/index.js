import React, {Component} from 'react'
import {Animated, View, Easing, Dimensions, Text} from 'react-native'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import * as Animatable from 'react-native-animatable';
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
        circleView: new Animated.Value(0),
        subscribeTimer: null,
        location: null,
        heading: {magHeading: null},
        playing: false,
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
                this.setState({location})
            })
            Location.getHeadingAsync().then(heading => {
                this.setState({heading})
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
            }),
            Animated.parallel([
                Animated.timing(this.state.circleView, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.out(Easing.ease)
                })
            ])
        ]).start();

    }

    _playingAnimation() {
        this.state.catpadDeg.setValue(0);

        Animated.sequence([
            Animated.timing(this.state.catpadDeg, {
                toValue: 1,
                duration: 100,
                easing: Easing.out(Easing.ease)
            }),
            Animated.timing(this.state.catpadDeg, {
                toValue: -1,
                duration: 200,
                easing: Easing.out(Easing.ease)
            }),
            Animated.timing(this.state.catpadDeg, {
                toValue: 0,
                duration: 100,
                easing: Easing.out(Easing.ease)
            }),
        ]).start(() => {
            if (this.state.playing) {
                this._playingAnimation()
            }
        });
    }


    _onPlay = () => {
        console.log("play");
        this.setState({playing: true});
        this._playingAnimation()
    }
    _onPause = () => {
        console.log("pause");
        this.setState({playing: false});
    }

    render() {
        let {circleSize, logoView, catpadDeg, circleView} = this.state;
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
                    ...styles.circleZoom
                }}/>

                <Animatable.View animation='fadeInUp' delay={200} style={{
                    opacity: circleView,
                    ...styles.headerLabel
                }}>
                    <Text>猫の声をたどりに </Text>
                    <Text>かんばんねこを探そう！</Text>
                </Animatable.View>

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

                <Animated.View style={{
                    opacity: circleView,
                    ...styles.catView
                }}>
                    <CatView cats={cats}/>
                </Animated.View>

                <Animated.Image style={{
                    transform: [{rotate: catpadDegValue}],
                    top: Dimensions.get('window').height / 2 - 140,
                    opacity: circleView,
                    ...styles.circle
                }} source={require('../../../assets/circle.png')}/>

                <Animated.View style={{
                    opacity: circleView,
                    display: this.state.playing ? 'flex' : 'none',
                    ...styles.searchingLabel
                }}>
                    <Text>大きい肉球は</Text>
                    <Text>近くにかんばんねこがいます</Text>
                </Animated.View>

                <Animatable.View animation='slideInUp' delay={500} style={styles.playButton}>
                    <PlayButton onPlay={this._onPlay} onPause={this._onPause}/>
                </Animatable.View>
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
