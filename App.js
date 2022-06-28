import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from './src/screens/HomeScreen';
import TableScreen from "./src/screens/TableScreen";
import MapScreen from "./src/screens/MapScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Table: TableScreen,
    Map: MapScreen
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'Página inicial',
    }
  }
)


export default createAppContainer(navigator);
