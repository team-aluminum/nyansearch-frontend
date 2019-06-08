import {createAppContainer} from 'react-navigation';
import RootNavigator from './src/config/RootNavigator';

const App = createAppContainer(RootNavigator);
export default App;
