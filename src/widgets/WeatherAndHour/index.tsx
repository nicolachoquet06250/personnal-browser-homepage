import Clock from './Clock.tsx';
import Weather from './Weather.tsx';
import styles from './widget.module.css';

export default function WeatherAndHour() {
    return (<section className={styles.widget}>
        <Clock />

        <Weather />
    </section>);
}