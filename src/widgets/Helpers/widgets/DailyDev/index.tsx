import Dialog from '@/components/Dialog';
import styles from './widget.module.css';
import {memo, useCallback, useState} from 'react';
import {BrowserView, MobileView} from 'react-device-detect';

const Title = memo(() => (<h1>Daily.dev</h1>));
const Iframe = memo(() => (<iframe
    src="https://app.daily.dev/popular"
    name='dailyDev'
    onClick={(e) => console.log('clicked', e)}
    className={styles.iframe}
> Veuillez installer l'extension "Ignore X-Frame headers" pour pouvoir afficher cette iframe </iframe>));

export default function DailyDev() {
    const [opened, setOpened] = useState(false);

    const handleClose = useCallback(() => setOpened(false), []);
    const handleBack = useCallback(() => window.history.back(), []);

    return (<>
        <BrowserView renderWithFragment={true}>
            <button onClick={() => setOpened(true)}
                    className={styles.container}
            >
                <div>
                    <Title />
                </div>
            </button>

            <Dialog opened={opened}
                    className={styles.container}
                    title={Title}
                    render={Iframe}
                    back={true}
                    onClose={handleClose}
                    onBack={handleBack}
            />
        </BrowserView>

        <MobileView />
    </>)
}