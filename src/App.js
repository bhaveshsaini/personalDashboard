import { Button, Card, CardGroup, CardColumns, CardDeck} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [weather, setWeather] = useState({
    picture: '',
    city: '',
    temperature: '',
    weather: '',
    threeDayForecast: [],
    day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  })

  const [stocks, setStocks] = useState({
    ticker: ['TSLA', 'AAPL', 'PLTR', 'NIO', 'UBER', 'LYFT', 'BA', 'AMC', 'AMD'],
    tickerDetails:[]
  })

  //Weather
  useEffect(() => { //updates every 2 hours
    getWeather(function getWeather() {
      axios.get('http://api.weatherapi.com/v1/forecast.json?key=3c39dd5af7ad40f3a32174316210407&q=fountain valley&days=5&aqi=no')
      .then((res) => {
        //change the date to day in response so it can be displayed in the UI
        res.data.forecast.forecastday.map((date, index) => {
          let d = new Date(date.date)
          res.data.forecast.forecastday[index].date = weather.day[d.getDay()]
        })
  
        //setting the state with weather details
        let condition = res.data.current.condition.text
        let currentDate = new Date()
  
        if(currentDate.getHours() > 20){ 
          setWeather({
            picture: 'https://i.pinimg.com/originals/3b/c4/09/3bc409491176b637edeb207a1d453b23.jpg',
            city: res.data.location.name,
            temperature: res.data.current.temp_f,
            weather: condition,
            threeDayForecast: res.data.forecast.forecastday,
            day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            })
        }
          
        else if(condition == 'overcast'){ setWeather(
          {
            picture: 'https://www.pngitem.com/pimgs/m/50-508220_black-and-white-overcast-cloud-cloudy-clip-art.png',
            city: res.data.location.name,
            temperature: res.data.current.temp_f,
            weather: condition,
            threeDayForecast: res.data.forecast.forecastday,
            day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
          }
          )
        }
          
        else if(condition == 'Partly cloudy'){ setWeather(
          {
            picture: 'https://cdn2.microscopesinternational.com/images/weather/v2/@224/day/mostly-cloudy.gif',
            city: res.data.location.name,
            temperature: res.data.current.temp_f,
            weather: condition,
            threeDayForecast: res.data.forecast.forecastday,
            day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
          }
          )
        }
  
        else if(condition == 'sunny'){ setWeather(
          {
            picture: 'https://i.pinimg.com/originals/75/16/ea/7516ea5454d6ebb256d2ecb34b66a95c.gif',
            city: res.data.location.name,
            temperature: res.data.current.temp_f,
            weather: condition,
            threeDayForecast: res.data.forecast.forecastday,
            day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
          }
          )
        }
  
        else if(condition.includes('rain')){ setWeather(
          {
            picture: 'https://icon-library.com/images/rain-icon-png/rain-icon-png-2.jpg',
            city: res.data.location.name,
            temperature: res.data.current.temp_f,
            weather: condition,
            threeDayForecast: res.data.forecast.forecastday,
            day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
          }
          )
        }
  
        else { setWeather(
            {
              picture: 'https://' + res.data.current.condition.icon.substring(2),
              city: res.data.location.name,
              temperature: res.data.current.temp_f,
              weather: condition,
              threeDayForecast: res.data.forecast.forecastday,
              day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            }
            )
        }

        // console.log(res)
      })
      .catch(e => console.log(e))
    }, 7200000); 
  }, [])

  function getWeather(func, delay){
    func()
    setInterval(() => {
      func()
    }, delay);
  }

  //Stocks
  useEffect(() => {// Updates every 5 minutes
    getStocks(function getStocks() { 
      stocks.ticker.map((stock) => {
        axios.get(`https://finnhub.io/api/v1/quote?symbol=${stock}&token=c41k7vaad3ies3kt5dgg`)
        .then((res) => {
          let start = res.config.url.search('=')
          let end = res.config.url.search('&')
          let ticker = res.config.url.substring(start + 1, end)
  
          //updating state with new data
          let currentTickerDetails = stocks.tickerDetails
          let flag = false
  
          currentTickerDetails.map((obj, index) => {
            if(obj.name == ticker)
            {
              currentTickerDetails[index] = {
                'name' : ticker,
                'currentPrice' : res.data.c,
                'change' : res.data.d,
                'percentChange' : res.data.dp
              }
              flag = true
            }
          })
  
          if(!flag) {
            currentTickerDetails.push({
              'name' : ticker,
              'currentPrice' : res.data.c,
              'change' : res.data.d,
              'percentChange' : res.data.dp
            })
          }
  
          //update the original array
          setStocks({
            ticker: ['TSLA', 'AAPL', 'PLTR', 'NIO', 'UBER', 'LYFT'],
            tickerDetails: currentTickerDetails
          })
          // console.log(stocks)
  
        })
        .catch((e) => console.log(e))
      })
    }, 300000);
  }, [])

  function getStocks(func, delay){
    func()
    setInterval(() => {
      func()
    }, delay);
  }


  return (
    <div className="mt-5  shadow-lg container-fluid text-center">
      <div className='card-group shadow-lg'>

        {/* WORK MAIL */}
        <Card border="dark" className="rounded shadow-lg cards mt-5 mb-5 mr-2 ml-2">
          <Card.Body>
            <img className='mb-2' src='https://i.pinimg.com/originals/9e/8d/60/9e8d60f99ed8d50161eba95f62193278.png' width='250' height='100'/>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>sample</td>
                  <td>sample</td>
                  <td>@sample</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>sample</td>
                  <td>sample</td>
                  <td>@sample</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>sample</td>
                  <td>sample</td>
                  <td>@sample</td>
                </tr>

                <tr>
                  <th scope="row">3</th>
                  <td>sample</td>
                  <td>sample</td>
                  <td>@sample</td>
                </tr>
              </tbody>
            </table>
            <Card.Title>work mail & meetings</Card.Title>
          </Card.Body>
        </Card>

        {/* WEATHER */}
        <Card border="dark" className='rounded shadow-lg cards mt-5 mb-5 mr-2 ml-2'>
          <Card.Body>
            <img src={weather.picture} width='150' height='100' />
            <h2>{weather.city}</h2>
            <h3>{parseInt(weather.temperature)}°</h3>
            <p><b>{weather.weather}</b></p>
            <table class="table ">
              <tbody>
                {
                  weather.threeDayForecast.map((day) => 
                    <tr>
                      <th scope="row">{day.date}</th>
                      <td><img src={'https://' + day.day.condition.icon.substring(2)}></img>
                      <p>{day.day.condition.text}</p></td>
                      <td>max {parseInt(day.day.maxtemp_f)}°<br />
                      min {parseInt(day.day.mintemp_f)}°
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </Card.Body>
        </Card>

        {/* STOCKS */}
        <Card border="dark shadow-lg" className='rounded mt-5 mb-5 mr-2 ml-2 cards'>
          <Card.Body>
            <img className='mb-3' width='300' height='200' src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/maxresdefault-1588953454.jpg"/>
            <table class="table ">
                  <thead>
                    <tr>
                      <th scope="col">Ticker</th>
                      <th scope="col">Price</th>
                      <th scope="col">$ Change</th>
                      <th scope="col">% Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stocks.tickerDetails.map((stock) => 
                      <tr>
                        <td>{stock.name}</td>     

                        <td>${stock.currentPrice}</td>

                        {stock.change < 0 ?
                        <td style={{color: "red"}}> ${Math.round(stock.change * 100) / 100}%</td> 
                        : 
                        <td style={{color: "rgb(50, 205, 50)"}}>${Math.round(stock.change * 100) / 100}</td>}

                        {stock.percentChange < 0 ? 
                        <td style={{color: "red"}}> {Math.round(stock.percentChange * 100) / 100}%</td>
                        : 
                        <td style={{color: "rgb(50, 205, 50)"}}>{Math.round(stock.percentChange * 100) / 100}%</td>}
                      </tr>)}
                  </tbody>
                </table>
          </Card.Body>
        </Card>

        {/* TESLA */}
        <Card border="dark shadow-lg" className='rounded mt-5 mb-5 mr-2 ml-2 cards'>
          <Card.Body>
            <Card.Img src="https://images.hgmsites.net/hug/2021-tesla-model-3_100777876_h.jpg"/>
            </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default App;