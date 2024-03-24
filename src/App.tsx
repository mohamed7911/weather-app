import React from "react";
import "./App.css";
import {useFetch} from "./hooks";
import {getData, getLocation} from "./server";
import {Location, WeatherData} from "interfaces/forecast";
import {Spinner} from "react-bootstrap";
import {Degree, WeatherForecast} from "./components";
import UnderlinedMenu from "components/buttons/UnderlinedMenu";
import MenuItem from "./components/buttons/MenuItem";
import DegreeItem from "./components/buttons/Degree";
import {useAppSelector} from "store";

function App() {
  const {
    isLoading: locationLoader,
    data: location,
    isError,
  } = useFetch<Location[]>({
    queryKey: "get-location",
    queryFn: () => getLocation(),
  });

  // fetch users using react-query library
  const {isLoading: forecastLoader, data: forecast} = useFetch<WeatherData>({
    queryKey: "get-forecast",
    queryFn: () => getData({q: location?.[0].name, days: 14}),
    options: {
      enabled: location !== undefined,
    },
  });

  const tempUnit = useAppSelector((state) => state.tempUnit);

  function formatDate(dateString: string | undefined): string {
    if (!dateString) {
      return "Unknown Date";
    }

    const date = new Date(dateString);
    const dayOfWeek = date.toLocaleString("en-US", {weekday: "long"});
    // const month = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();

    return `${dayOfWeek} ${day}, ${year}`;
  }

  return (
    <div className="App">
      {(locationLoader || forecastLoader) && (
        <div className="mid-container">
          <Spinner animation="border" />
        </div>
      )}

      {!locationLoader && !forecastLoader && (
        <>
          {isError ? (
            <div className="mid-container">
              <h1>An error occurred please try again later</h1>
            </div>
          ) : (
            <div className="custom-container">
              <div className="navigation-bar d-flex">
                <div className="nav-text">INSTAWEATHER</div>
                <div className="d-flex justify-content-end">
                  <UnderlinedMenu className={"sideline-button"}>
                    <DegreeItem text="C" />
                    <DegreeItem text="F" />
                  </UnderlinedMenu>
                </div>
              </div>

              <div className="middle-container">
                <div className="middle-section">
                  <h1>{location?.[0].name}</h1>
                  <h4>{formatDate(forecast?.forecast.forecastday[0].date)}</h4>
                  <img
                    src={forecast?.forecast.forecastday[0].day.condition.icon}
                    alt=""
                  />
                  <h3>
                    {
                      forecast?.forecast.forecastday[0].day.condition.text.split(
                        " "
                      )[0]
                    }
                  </h3>
                </div>

                <div className="r-mid-container">
                  <Degree
                    style={{
                      fontSize: "var(--font-size-4xl)",
                      fontWeight: "700",
                    }}
                    temp={
                      tempUnit == "C"
                        ? forecast?.forecast.forecastday[0].day.avgtemp_c
                        : forecast?.forecast.forecastday[0].day.avgtemp_f
                    }
                  />
                  <div className="d-flex align-items-center">
                    <Degree
                      style={{fontSize: "var(--font-size-2xl)"}}
                      temp={
                        tempUnit == "C"
                          ? forecast?.forecast.forecastday[0].day.maxtemp_c
                          : forecast?.forecast.forecastday[0].day.maxtemp_f
                      }
                    />
                    <h1
                      style={{
                        fontSize: "var(--font-size-2xl)",
                        marginInline: "6px 10px",
                      }}
                    >
                      /
                    </h1>
                    <Degree
                      style={{
                        fontSize: "var(--font-size-2xl)",
                        color: "#FFFFFFBF",
                      }}
                      temp={
                        tempUnit == "C"
                          ? forecast?.forecast.forecastday[0].day.mintemp_c
                          : forecast?.forecast.forecastday[0].day.mintemp_f
                      }
                    />
                  </div>
                  <h3
                    style={{fontSize: "var(--font-size-lg)", marginTop: "23px"}}
                  >
                    {forecast?.forecast.forecastday[0].day.condition.text}
                  </h3>
                </div>
              </div>

              <UnderlinedMenu className={"underlined-menu"}>
                <MenuItem text="Hourly" />
                <MenuItem text="Daily" />
              </UnderlinedMenu>

              <WeatherForecast forecast={forecast?.forecast} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
