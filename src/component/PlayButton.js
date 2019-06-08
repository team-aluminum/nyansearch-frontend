import React, {Component} from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native'

export default class PlayButton extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableOpacity>
                <View style={styles.button}>
                    <Text>▶</Text>
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
        width: 320,
        height: 40,
        backgroundColor: '#A67F78',
    }
});
