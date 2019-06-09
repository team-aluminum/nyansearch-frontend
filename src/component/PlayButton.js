import React, {Component} from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet, Dimensions, Animated, Easing} from 'react-native'

export default class PlayButton extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        playing: false,
        talkIcon: 0,
    }
    _onPlay = () => {
        this.props.onPlay();
        this._iconAnimation();
    }
    _onPause = () => {
        this.props.onPause();
    }

    _onPress = () => {
        this.setState({playing: !this.state.playing});

        if (this.state.playing) {
            this._onPause();
            return
        }

        this._onPlay();
    }

    _iconAnimation() {
        setTimeout( ()=> {
            if (!this.state.playing) {
                this.setState({talkIcon: 0});

                return;
            }

            if (this.state.talkIcon < 15) {
                this.setState({talkIcon: this.state.talkIcon + 1});
                this._iconAnimation();

                return;
            }
            this.setState({talkIcon: 0});

            if (this.state.playing) {
                this._iconAnimation();
            }
        }, 50);
    }

    render() {
        return (
            <TouchableOpacity onPress={this._onPress}>
                <Image source={require('../../assets/icon-wail-cat.png')} />
                <View style={styles.button}>
                    <Image source={require('../../assets/icon-talk0.png')} style={{
                        opacity: this.state.talkIcon === 0 || this.state.talkIcon > 7 ? 1 : 0,
                        ...styles.icon
                    }} />
                    <Image source={require('../../assets/icon-talk1.png')} style={{
                        opacity: this.state.talkIcon === 1 ? 1 : 0,
                        ...styles.icon
                    }} />
                    <Image source={require('../../assets/icon-talk2.png')} style={{
                        opacity: this.state.talkIcon === 2 ? 1 : 0,
                        ...styles.icon
                    }} />
                    <Image source={require('../../assets/icon-talk3.png')} style={{
                        opacity: this.state.talkIcon === 3 ? 1 : 0,
                        ...styles.icon
                    }} />
                    <Image source={require('../../assets/icon-talk4.png')} style={{
                        opacity: this.state.talkIcon === 4 ? 1 : 0,
                        ...styles.icon
                    }} />
                    <Image source={require('../../assets/icon-talk5.png')} style={{
                        opacity: this.state.talkIcon === 5 ? 1 : 0,
                        ...styles.icon
                    }} />
                    <Image source={require('../../assets/icon-talk6.png')} style={{
                        opacity: this.state.talkIcon === 6 ? 1 : 0,
                        ...styles.icon
                    }} />
                    <Image source={require('../../assets/icon-talk7.png')} style={{
                        opacity: this.state.talkIcon === 7 ? 1 : 0,
                        ...styles.icon
                    }} />
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width - 32,
        height: 80,
        backgroundColor: '#A37E76',
        borderRadius: 8,
    },
    icon: {
        position: 'absolute',
        width: 32,
        height: 28,
    }
});
