import {useWeather, weatherIcons, weatherWording} from './hooks/use-weather.ts';
import styles from './widget.module.css';
import {useDate} from './hooks/use-date.ts';

export default function Weather() {
    const {weather, loading, error} = useWeather();
    const [strDate,, getDateDirectFrom, currentDate] = useDate();

    return (<div className={styles.weather}>
        {loading &&
            (<span>Chargement...</span>) ||
                (error && (<span>Erreur : {error}</span>) || (<>
                    <div className={styles.firstLine}>
                        <div className={styles.weatherLeftSection}>
                            <div>
                                <div className={styles.iconContainer}>
                                    <img src={weatherIcons[weather.currentConditions?.conditions]}
                                         alt={weatherWording[weather.currentConditions?.conditions]} />
                                </div>

                                <div className={styles.tempContainer}>
                                    <h1>
                                        {weather.currentConditions.temp} <sup>°C</sup>
                                    </h1>
                                </div>

                                <div className={styles.dataList}>
                                    <ul>
                                        <li>
                                            Humidité: {weather.currentConditions.humidity}%
                                        </li>

                                        <li>
                                            Vent: {weather.currentConditions.windspeed} km/h
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className={styles.sunstateContainer}>
                                <div className={styles.sunstate}>
                                    <img src={weatherIcons.Sunrise}
                                         alt="Sunrise icon"
                                         style={{
                                             filter: 'invert()',
                                             width: '40px'
                                         }}
                                    /> {weather.currentConditions.sunrise}
                                </div>

                                <div className={styles.sunstate}>
                                    <img src={weatherIcons.Sunset}
                                         alt="Sunset icon"
                                         style={{
                                             filter: 'invert()',
                                             width: '40px'
                                         }}
                                    /> {weather.currentConditions.sunset}
                                </div>
                            </div>
                        </div>

                        <div className={styles.weatherRightSection}>
                            <h2>Météo</h2>
                            <p>{`${strDate}`}</p>
                            <p>{weatherWording[weather.currentConditions.conditions]}</p>
                        </div>
                    </div>

                    <div className={styles.secondLine}>
                        {weather.days.map((day, i) =>
                            (<div key={i} className={day.datetime === currentDate ? styles.currentDay : ''}>
                                <div>
                                    {`${getDateDirectFrom(day.datetime, 'FRLightDayName')}`}
                                </div>

                                <div className={styles.iconContainer}>
                                    <img src={weatherIcons[day?.conditions]}
                                         alt={weatherWording[day?.conditions]} />
                                </div>

                                <div>
                                    <strong>
                                        {day.tempmax} <sup>°C</sup>
                                    </strong>

                                    {/*<span dangerouslySetInnerHTML={{__html: '&nbsp;'}}></span>*/}

                                    <span>
                                        {day.tempmin} <sup>°C</sup>
                                    </span>
                                </div>
                            </div>))}
                    </div>
                </>))}
    </div>);
}
