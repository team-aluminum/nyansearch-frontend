import React, {Component} from 'react'
import {Animated, View, Easing, Dimensions, Text, Image} from 'react-native'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import * as Animatable from 'react-native-animatable';
import { Audio } from 'expo-av'
import styles from './style'
import PlayButton from '../../component/PlayButton'
import CatView from '../../component/CatView'
import ApiClient from '../../utils/ApiClient'

export class HomeScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    state = {
        circleSize: new Animated.Value(0),
        catpadDeg: new Animated.Value(0),
        catpadTop: new Animated.Value(0),
        logoView: new Animated.Value(0),
        textLogoView: new Animated.Value(1),
        circleView: new Animated.Value(0),
        subscribeTimer: null,
        soundTimer: null,
        location: { lat: null, long: null },
        heading: null,
        playing: false,
        cats: [],
        newCats: [],
        soundUrl: null,
        soundObject: null,
    };

    componentDidMount() {
        this._launchAnimation()
        const timer = setInterval(() => {
            this._subscribe()
        }, 2000)
        this.setState(() => { subscribeTimer: timer })

        setTimeout(() => {
            this.props.navigation.navigate('Home')
        }, 1500);

        const soundTimer = setInterval(() => {
            this._playSound()
        }, 5000)
        this.setState(() => { soundTimer })
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    _playSound() {
        if (!this.state.soundUrl) {
            return
        }
        if (!this.state.soundObject) {
            this.setState({
                soundObject: new Audio.Sound()
            })
        }
        this.state.soundObject.loadAsync({uri: this.state.soundUrl}).then(() => {
            this.state.soundObject.playAsync().then(() => {
                this.state.soundObject.unloadAsync()
            })
        })
    }
    _getLocationAsync() {
        Permissions.askAsync(Permissions.LOCATION).then(res => {
            if (res.status !== 'granted') {
                return
            }
            Location.getCurrentPositionAsync({}).then(location => {
                this.setState({ location: { lat: location.coords.latitude, long: location.coords.longitude } })
            })
            Location.getHeadingAsync().then(heading => {
                this.setState({ heading: heading.trueHeading })
            })
        })
    }

    _subscribe = () => {
        this._getLocationAsync()
        if (this.state.playing && this.state.heading && this.state.location.lat && this.state.location.long) {
            ApiClient('get', `/sound?direction=${this.state.heading}&longitude=${this.state.location.long}&latitude=${this.state.location.lat}`).then(response => {
                this.setState({ soundUrl: response.data.url })
                if (this.state.cats.length === 0) {
                    this.setState({
                        cats: response.data.cats.map(cat => {
                            return {
                                size: cat.size,
                                deg: cat.direction,
                            }
                        })
                    })
                } else {
                    const newCats = response.data.cats.map(cat => {
                        return {
                            size: cat.size,
                            deg: cat.direction,
                        }
                    })
                    const diffs = this.state.cats.map((cat, i) => {
                        return newCats[i].deg - cat.deg
                    })
                    let count = 0
                    const _timer = setInterval(() => {
                        count++
                        this.setState({
                            cats: this.state.cats.map((cat, i) => {
                                return {
                                    size: cat.size,
                                    deg: cat.deg + diffs[i] / 100,
                                }
                            })
                        })
                        if (count >= 100) {
                            clearInterval(_timer)
                        }
                    }, 10)
                }
            })
        } else {
            this.setState({
                soundUrl: null,
                cats: [],
            })
        }
    }
    _unsubscribe = () => {
        clearInterval(this.state.subscribeTimer)
        clearInterval(this.state.soundTimer)
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
            Animated.timing(this.state.textLogoView, {
                toValue: 0,
                duration: 500,
                easing: Easing.out(Easing.ease)
            }),
            Animated.parallel([
                Animated.timing(this.state.circleView, {
                    toValue: 1,
                    duration: 1000,
                    delay: 150,
                    easing: Easing.out(Easing.ease)
                })
            ])
        ]).start();
    }

    _playingAnimation() {
        this.state.catpadDeg.setValue(0);

        Animated.sequence([
            Animated.timing(this.state.catpadTop, {
                toValue: 1,
                duration: 1000,
                easing: Easing.out(Easing.ease)
            }),
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
                duration: 200,
                easing: Easing.out(Easing.ease)
            }),
            Animated.timing(this.state.catpadDeg, {
                toValue: 0,
                duration: 200,
                easing: Easing.out(Easing.ease)
            }),
        ]).start(() => {
            if (this.state.playing) {
                this._playingAnimation()
            }
        });
    }


    _onPlay = () => {
        this.setState({playing: true});
        this._playingAnimation()
    }
    _onPause = () => {
        this.setState({playing: false});
    }

    render() {
        let {circleSize, logoView, catpadDeg, catpadTop, circleView, textLogoView} = this.state;
        let catpadDegValue = catpadDeg.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: ['-15deg', '0deg', '15deg']
        });
        let catTopValue = catpadTop.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 45]
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

                <Animatable.Image
                    animation='fadeInUp' delay={1550}  style={{
                        opacity: circleView,
                        ...styles.headerLabel
                    }}
                    source={require('../../../assets/header-label.png')}
                />

                <View style={styles.catpad}>
                    <Animated.Image style={{
                        transform: [{rotate: catpadDegValue}],
                        marginBottom: logoMargin,
                    }} source={require('../../../assets/catpad.png')}/>
                </View>

                <Animated.View style={{opacity: textLogoView, ...styles.logoContainer}}>
                    <Image source={require('../../../assets/logo.png')} style={{...styles.logoImage}} />
                </Animated.View>

                <Animated.View style={{
                    opacity: circleView,
                    ...styles.catView
                }}>
                    <CatView cats={this.state.cats}/>
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
                    ...styles.searchingLabelContainer
                }}>
                    <Text style={styles.searchingLabel}>大きい肉球は</Text>
                    <Text style={styles.searchingLabel}>近くにかんばんねこがいます</Text>
                </Animated.View>

                <Animatable.View animation='slideInUp' delay={1950} duration={1000} style={styles.playButton}>
                    <PlayButton onPlay={this._onPlay} onPause={this._onPause}/>
                </Animatable.View>
            </View>
        );
    }

}

// run Example
// const cats = [
//     {id: 1, deg: 0, size: 2}, // left
//     {id: 2, deg: 90, size: 1}, // top
//     {id: 3, deg: 180, size: 1}, // right
//     {id: 5, deg: 320, size: 1}, // custom
// ];
