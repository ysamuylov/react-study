import React, {Component} from 'react';
import './App.css';
import cities from './city.list.json';

const API_KEY = "6cc2aabb5171fe34d8f28f9c4a45cde0"; // здесь должен быть ВАШ ключ!
const TEMP_DIFF = 273;

async function getTemperature(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  return await fetch(url)
      .then(value => value.json())
      .then(({main: {temp}}) => Math.round(temp - TEMP_DIFF));
}

export default class App extends Component {

  static defaultProps = {
    city: 'Moscow,ru',
  };

  constructor(props) {
    super(props);
    const {city} = props;
    this.state = {temp: undefined, city};
    getTemperature(city)
        .then(temp => this.setState({temp}));
    
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({city: event.target.value});
    getTemperature(event.target.value)
        .then(temp => this.setState({temp}));
    // this.setState({value: event.target.value});
  }

  render() {
    const {state: {temp, city}} = this;
    return (<form>
        <div className="App">Pick a city: 
        <select onChange={this.handleChange}>
          {cities.slice(0, 100).map((v, i) => <option key={i}>{v.name}</option>)}
        </select>
        </div>
        <div className="App">
          Температура в городе {city}: {temp}
        </div>
      </form>)
  }
}
