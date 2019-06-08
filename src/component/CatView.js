import React, {Component} from 'react';
import {Animated, TouchableOpacity, View, Text, Image, StyleSheet, Dimensions} from 'react-native'

export default class CatView extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Animated.View style={styles.container}>
                {this.props.cats.map((cats, index) =>
                    <View key={index} style={{
                        transform: [{rotate: cats.deg + 'deg'}],
                        ...styles.itemWrap
                    }}>
                        <Animated.Image style={{
                            width: catSizies[cats.size - 1],
                            height: catSizies[cats.size - 1],
                            ...styles.item
                        }} source={require('../../assets/app-icon.png')} />
                    </View>
                )}
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    },
    itemWrap: {
        position:  'absolute',
        textAlign: 'left',
        width: 320,
        height: 48,
    },
    item: {
        position:  'absolute',
        transform: [{rotate: '270deg'}],
    }
});

const catSizies = [24, 44, 56];
