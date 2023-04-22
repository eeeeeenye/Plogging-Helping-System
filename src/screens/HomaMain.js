import {WebView} from "react-native-webview";

export default class Location extends Component{


  render(){
    return(
      <WebView
      source={{uri: "http://localhost:8080/"}}
      />
    );
  }
}
