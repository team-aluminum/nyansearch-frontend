import {createSwitchNavigator} from 'react-navigation';
import {HomeScreen} from '../screen/HomeScreen'
import {LunchScreen} from '../screen/LunchScreen'

export default createSwitchNavigator({
    Lunch: {screen: LunchScreen},
    Home: {screen: HomeScreen},
});

