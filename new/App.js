import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from './src/screens/HomeScreen';
import TableScreen from "./src/screens/TableScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Image: ImageScreen,
    Counter: CounterScreen,
    Color: ColorsScreen,
    Square: SquareScreen,
    Table: TableScreen
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'learning-app'
    }
  }
)


export default createAppContainer(navigator);
