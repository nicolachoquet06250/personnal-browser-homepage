import {useClock} from './hooks/use-clock.ts';
import styles from './widget.module.css';

export default function Clock() {
    const {hours, minutes, seconds} = useClock();

    return (<div className={styles.clock}>
        <h1>
            {hours}:{minutes}:{seconds}
        </h1>
    </div>);
}