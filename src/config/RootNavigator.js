import {createStackNavigator} from 'react-navigation';
import {HomeScreen} from '../screen/HomeScreen'
import {LunchScreen} from '../screen/LunchScreen'

export default createStackNavigator({
    Lunch: {screen: LunchScreen},
    Home: {screen: HomeScreen},
});

