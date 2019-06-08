import {View, Text, Button} from 'react-native'

export default {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>This is React Native!</Text>
                <Button
                    title="Button"
                    onPress={this._onPressButton}
                />
            </View>
        );
    }
}
