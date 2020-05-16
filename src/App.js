import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import 'tachyons';
import Logo from './Components/Logo/Logo';
import './App.css';
import Rank from './Components/Rank/Rank';
import Imagelinkform from './Components/imagelinkform/imagelinkform';
import FaceRecognition from './Components/facerecognition/facerecognition';
import Signin from './Components/signin/signin';
import Register from './Components/register/register';
import Particles from 'react-particles-js';

const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'fe9e5637ab3647bb931a4ff4c273a234'
});

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends React.Component {
  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:'',
      box:{},
      route:'signin',
      isSignedIn:false,
      rank:0,
      currentuser:'',
      currentemail:''
    }
  }

  calculateFaceLocation = (data) => {
    //console.log(data);
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    //console.log(box);
    this.setState({box: box});
  }

  getUrl=(url)=>{
    this.setState({input:url.target.value})
    //console.log(this.state.input)
  };

  onButtonSubmit=()=>{
    this.setState({imageUrl:this.state.input})
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.input).then(
    (response) =>{
      this.displayFaceBox(this.calculateFaceLocation(response));
    })
    .catch(err=>console.log(err));

    fetch('http://localhost:3001/image',{
      method:'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
                email: this.state.currentemail,
              })
    })
    .then(response=>response.clone().json())
    .then(data=>{ //console.log(data)
      //this.setState({rank:data})
      this.fetchinfo_entries(data)
    })
    //.catch(console.log("Error"))

    };

  onRouteChange=(route)=>{
    if(route==='home'){
      this.setState({isSignedIn:true})
    }else if(route==='signout'){
      this.setState({isSignedIn:false})
    }
    this.setState({route:route})
  }

  fetchinfo_user=(user,email)=>{
    this.setState({currentuser:user})
    this.setState({currentemail:email})
  }

  fetchinfo_entries=(entries)=>{
    this.setState({rank:entries})
  }

  render(){
  return (
    <div className='App'>
      <Particles className='particles'
          params={particlesOptions}
      />
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
      {this.state.route==='home'?
      <div>
      <Logo />
      <Rank rank={this.state.rank} user={this.state.currentuser}/>
      <Imagelinkform getUrl={this.getUrl} onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
      </div>:( this.state.route==='signin'?
      <Signin onRouteChange={this.onRouteChange} fetchinfo_user={this.fetchinfo_user} fetchinfo_entries={this.fetchinfo_entries}
      />:<Register onRouteChange={this.onRouteChange} fetchinfo_user={this.fetchinfo_user} fetchinfo_entries={this.fetchinfo_entries}/>)

  }</div>
  );
}}

export default App;
