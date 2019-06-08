import React, {Component} from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet, Dimensions} from 'react-native'

export default class PlayButton extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        playing: false,
    }
    _onPlay = () => {
        this.props.onPlay();
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

    render() {
        return (
            <TouchableOpacity onPress={this._onPress}>
                <Image source={require('../../assets/icon-wail-cat.png')} />
                <View style={styles.button}>
                    <Image source={require('../../assets/icon-play.png')} style={{
                        display: !this.state.playing ? 'flex' : 'none'
                    }} />
                    <Image source={require('../../assets/icon-pause.png')} style={{
                        display: this.state.playing ? 'flex' : 'none'
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
    }
});
