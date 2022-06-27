import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ColorsScreen from "./src/screens/ColorScreen";
import CounterScreen from "./src/screens/CounterScreen";
import HomeScreen from './src/screens/HomeScreen';
import ImageScreen from "./src/screens/ImageScreen";
import SquareScreen from "./src/screens/SquareScreen";
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
