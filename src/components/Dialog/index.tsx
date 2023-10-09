import styles from './dialog.module.css';
import {ElementType, MemoExoticComponent, ReactElement} from 'react';

type DialogRender = MemoExoticComponent<
    <T extends DialogProps>(p: Partial<T>) => ReactElement<Omit<DialogProps, 'render' | 'onBack' | 'onClose'>>
> | ReactElement<Omit<DialogProps, 'render' | 'onBack' | 'onClose'>>|(() => JSX.Element);

/*type DialogProps<
    C1 extends RenderReduceItemTuple[1],
    C2 extends DialogRender
> = {
    /**
     * @deprecated
     * La pratique des children est dépréciée dans la nouvelle doc de react
     *\/
    className?: string,
    title?: C1,
    back?: boolean,
    opened: boolean,
    onClose: () => void,
    onBack?: () => void,
    render: C2
};*/

const backIcon = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' height=\'1em\' viewBox=\'0 0 448 512\'%3E%3C!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --%3E%3Cpath d=\'M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z\'/%3E%3C/svg%3E';

function isFunctionComponent<T>(component: T) {
    return typeof component === 'function'
}

function isMemoComponent<T>(component: T) {
    return (
        typeof component === 'object' &&
        ((component as {$$typeof: string}).$$typeof ?? '').toString() === 'Symbol(react.memo)'
    )
}

function isReactComponent<T>(component: T) {
    return (isFunctionComponent(component) || isMemoComponent(component))
}

type DialogProps = {
    /**
     * @deprecated
     * La pratique des children est dépréciée dans la nouvelle doc de react
     */
    className?: string,
    title?: MemoExoticComponent<() => JSX.Element> | JSX.Element | null,
    back?: boolean,
    opened: boolean,
    onClose: () => void,
    onBack?: () => void,
    render: DialogRender
};

export default function Dialog<P extends DialogProps>({
    opened,
    className = '',
    back = false,
    title: Title = null,
    render: Render,
    onClose = () => null,
    onBack = () => null
}: P) {
    const CTitle = Title as ElementType;
    const CRender = Render as ElementType;

    return (<dialog open={opened}
                    className={`${styles.dialog} ${className}`}>
        <header className={Title || back ? styles.headerWithTitle : ''}>
            {back && (<button onClick={onBack}>
                <img src={backIcon}
                     alt='back icon'
                     style={{filter: 'invert()'}}
                />
            </button>)}

            {Title && (<div>
                {isReactComponent(Title)
                    ? (<CTitle />)
                    : (<>{Title}</>)}
            </div>)}

            <button onClick={onClose}>X</button>
        </header>

        <main>
            {Render && (isReactComponent(Render) ? (<CRender {...
                Object.keys({opened, className, Title, back, onClose, onBack, Render})
                    .filter((k) => !(['Render'].includes(k) && k.startsWith('on')))
                    .reduce<Partial<P>>((r, k) => ({
                        ...r,
                        [k.toLowerCase()]: ({
                            opened, className, back,
                            render: Render,
                            title: Title,
                            onClose, onBack} as P)[k.toLowerCase() as keyof P]
                    }), {})
            } />) : (<>{Render}</>))}
        </main>
    </dialog>);
}