import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native'


export class HomeScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Test</Text>
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

});
