import {StyleSheet} from "react-native";

export default StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#414143',

    },
    circle: {
        backgroundColor: '#E1DCD9',
        position: 'absolute',
        zIndex: 0,
    },
    catpad: {
        position: 'absolute',
        zIndex: 10,
    },
    playButton: {
        position: 'absolute',
        bottom: 96,
    },

});
