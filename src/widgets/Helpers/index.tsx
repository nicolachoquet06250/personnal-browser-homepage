import styles from './widget.module.css';
import EuclydePhpFramework from './widgets/EuclydePhpFramework';
import DailyDev from './widgets/DailyDev';

export default function EuclydeHelpers() {
    return (<section className={styles.widget}>
        <hr/>

        <div>
            <h1>Euclyde Helpers</h1>
        </div>

        <div>
            <EuclydePhpFramework />
            <DailyDev />
        </div>
    </section>);
}