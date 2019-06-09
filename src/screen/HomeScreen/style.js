import {Dimensions, StyleSheet} from "react-native";

export default StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#414143',

    },
    circleZoom: {
        backgroundColor: '#E1DCD9',
        position: 'absolute',
        zIndex: 0,
    },
    catpad: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 10,
    },
    logoContainer: {},
    logoImage: {
        width: 120,
        height: 56,
    },
    catView: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 320,
        height: 320,
        top: Dimensions.get('window').height / 2 - 160 - 80,
        left: Dimensions.get('window').width / 2 - 320,
        zIndex: 1,
    },
    headerLabel: {
        position: 'absolute',
        top: 120,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchingLabel: {
        position: 'absolute',
        bottom: 114,
        fontSize: 25,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        flex: 1,
        position: 'absolute',
        zIndex: 10,
    },
    playButton: {
        position: 'absolute',
        bottom: 20,
    },

});
