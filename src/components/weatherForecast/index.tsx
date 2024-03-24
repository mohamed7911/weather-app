import {ForecastDay} from "interfaces/forecast";
import { useAppSelector } from "store";
import { motion } from 'framer-motion';
import Degree from "../degree";

interface ForecastProps {
  forecast?: {forecastday: ForecastDay[]};
}

const WeatherForecast = ({forecast}: ForecastProps) => {

  const tempUnit  = useAppSelector((state) => state.tempUnit);

  const forecastUnit  = useAppSelector((state) => state.forecastUnit);


  const handleTimeFormat = (hour: any) => {
          const currentTime = new Date();
          const hourTime = new Date(hour.time);
          let formattedTime = `${hourTime.getHours().toString().padStart(2, "0")}:${hourTime.getMinutes().toString().padStart(2, "0")}`;
        
          if( currentTime.getMinutes() >= 30 ){
            if ( currentTime.getHours() + 1 === hourTime.getHours() ) {
              formattedTime = "Now";
            }
          }else{
            if ( currentTime.getHours() === hourTime.getHours() ) {
              formattedTime = "Now";
            }
          }
          
          return formattedTime;
  }

  if (!forecast) {
    // Handle case when forecast data is not available
    return <div>Loading...</div>;
  }

  const renderDailyForecast = () => {
   return forecast.forecastday.map((day,idx) => (
    <motion.div
        className="weather-box"
        key={day.date}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="time">{idx === 0 ? "Today" : day.date}</p>
        <img src={day.day.condition.icon} alt={`Weather icon for ${day.date}`} />
        <Degree temp={tempUnit === 'C' ? day.day.avgtemp_c : day.day.avgtemp_f} style={{fontSize:"var(--font-size-xl)"}}/>
      </motion.div>
    ));
  };

  const renderHourlyForecast = () => {
    return forecast.forecastday[0].hour.map((hour) => {

      const formattedTime = handleTimeFormat(hour);

      return (
        <motion.div 
          className="weather-box" 
          key={hour.time}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          >
            <p className="time">{formattedTime}</p>
            <img
              src={hour.condition.icon}
              alt={`Weather icon for ${formattedTime}`}
            />
            <Degree temp={tempUnit === "C" ? hour.temp_c : hour.temp_f} style={{fontSize:"var(--font-size-xl)"}}/>
        </motion.div>
      );
    });
  };

  return (
    <div>
      {
        forecastUnit == "Hourly"
        ?
          <div className="weather-container">{renderHourlyForecast()}</div>
        :
          <div className="weather-container">{renderDailyForecast()}</div>
      }

    </div>
  );
};

export default WeatherForecast;
