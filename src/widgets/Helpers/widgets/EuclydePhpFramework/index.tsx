import {useEffect, useState} from 'react';
import { Light as Highlight } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash';
import Dialog from '@/components/Dialog';

const Title = () => (<h1>Php Framework</h1>);

const DialogBody = () => (<>
    <h1>Appel d'un script</h1>

    <Highlight language="bash" style={dark}>
        {`/path/to/program.php --arg1="arg1Value" --arg2`}
    </Highlight>

    <h1>Les différents scripts</h1>

    <h2>Client: Euclyde</h2>

    <h3>Plugin "export_manuel"</h3>

    <Highlight language='bash' style={dark}>
        {`/TOOLS/php_customer/php_depot/Euclyde/export_mensuel/export_client.php \\
    --rep_scripts="value" \\
    --code_client="value"`}
    </Highlight>

    <table>
        <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Valeur par défaut</th>
            <th>Description</th>
        </tr>
        </thead>

        <tbody>
        <tr>
            <td>--rep_scripts</td>
            <td>string</td>
            <td>-</td>
            <td>Répertoire où récupérer les bibliothèques utilisées</td>
        </tr>
        <tr>
            <td>--code_client</td>
            <td>string</td>
            <td>-</td>
            <td>code du client</td>
        </tr>
        <tr>
            <td>--help</td>
            <td>boolean</td>
            <td>false</td>
            <td>Définit si on affiche l'aide de la commande</td>
        </tr>
        </tbody>
    </table>

    <hr/>

    <Highlight language='bash' style={dark}>
        {`/TOOLS/php_customer/php_depot/Euclyde/export_mensuel/export_client_librenms_monthly.php \\
    --rep_scripts="value" \\
    --itop_serveur="value" \\
    --code_client="value" \\
    --o365_serveur_mail="value" \\
    [--o365_user_message="value"]`}
    </Highlight>

    <table>
        <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Valeur par défaut</th>
            <th>Description</th>
        </tr>
        </thead>

        <tbody>
        <tr>
            <td><code>--rep_scripts</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>Répertoire où récupérer les bibliothèques utilisées</td>
        </tr>
        <tr>
            <td><code>--itop_serveur</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>Nom du serveur itop dans le fichier de conf des serveurs</td>
        </tr>
        <tr>
            <td><code>--code_client</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>code du client</td>
        </tr>
        <tr>
            <td><code>--o365_serveur_mail</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>serveur o365 pour la messagerie</td>
        </tr>
        <tr>
            <td><code>--o365_user_message</code></td>
            <td><code>string</code></td>
            <td><code>&quot;Damien Vargas&quot;</code></td>
            <td>serveur o365 pour la messagerie</td>
        </tr>
        <tr>
            <td><code>--help</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Définit si on affiche l&#39;aide de la commande</td>
        </tr>
        </tbody>
    </table>

    <hr/>

    <Highlight language='bash' style={dark}>
        {`/TOOLS/php_customer/php_depot/Euclyde/export_mensuel/export_client_veeam_daily.php \\
    --rep_scripts="value" \\
    --itop_serveur="value" \\
    --code_client="value" \\
    --o365_serveur_mail="value" \\
    [--o365_user_message="value"]`}
    </Highlight>

    <table>
        <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Valeur par défaut</th>
            <th>Description</th>
        </tr>
        </thead>

        <tbody>
        <tr>
            <td><code>--rep_scripts</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>Répertoire où récupérer les bibliothèques utilisées</td>
        </tr>
        <tr>
            <td><code>--itop_serveur</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>Nom du serveur itop dans le fichier de conf des serveurs</td>
        </tr>
        <tr>
            <td><code>--code_client</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>code du client</td>
        </tr>
        <tr>
            <td><code>--o365_serveur_mail</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>serveur o365 pour la messagerie</td>
        </tr>
        <tr>
            <td><code>--o365_user_message</code></td>
            <td><code>string</code></td>
            <td><code>&quot;Damien Vargas&quot;</code></td>
            <td>serveur o365 pour la messagerie</td>
        </tr>
        <tr>
            <td><code>--help</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Définit si on affiche l&#39;aide de la commande</td>
        </tr>
        </tbody>
    </table>

    <hr/>

    <Highlight language='bash' style={dark}>
        {`/TOOLS/php_customer/php_depot/Euclyde/export_mensuel/export_comptable_assets.php \\
    --rep_scripts="value" \\
    --itop_serveur="value"`}
    </Highlight>

    <table>
        <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Valeur par défaut</th>
            <th>Description</th>
        </tr>
        </thead>

        <tbody>
        <tr>
            <td><code>--rep_scripts</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>Répertoire où récupérer les bibliothèques utilisées</td>
        </tr>
        <tr>
            <td><code>--itop_serveur</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>Nom du serveur itop dans le fichier de conf des serveurs</td>
        </tr>
        <tr>
            <td><code>--help</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Définit si on affiche l&#39;aide de la commande</td>
        </tr>
        </tbody>
    </table>

    <hr/>

    <Highlight language='bash' style={dark}>
        {`/TOOLS/php_customer/php_depot/Euclyde/export_mensuel/export_facilities_elect.php \\
    --rep_scripts="value" \\
    --itop_serveur="value" \\
    --coservit_serveur="value"`}
    </Highlight>

    <table>
        <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Valeur par défaut</th>
            <th>Description</th>
        </tr>
        </thead>

        <tbody>
        <tr>
            <td><code>--rep_scripts</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>Répertoire où récupérer les bibliothèques utilisées</td>
        </tr>
        <tr>
            <td><code>--itop_serveur</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>Nom du serveur itop dans le fichier de conf des serveurs</td>
        </tr>
        <tr>
            <td><code>--coservit_serveur</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>Nom du serveur coservit dans le fichier de conf des serveurs</td>
        </tr>
        <tr>
            <td><code>--help</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Définit si on affiche l&#39;aide de la commande</td>
        </tr>
        </tbody>
    </table>

    <hr/>

    <Highlight language='bash' style={dark}>
        {`/TOOLS/php_customer/php_depot/Euclyde/export_mensuel/export_rapport_o365.php \\
    --rep_scripts="value" \\
    --itop_serveur="value" \\
    --o365_serveur="value" \\
    --o365_serveur_sp="value" \\
    --fichier_sortie="value"`}
    </Highlight>

    <table>
        <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Valeur par défaut</th>
            <th>Description</th>
        </tr>
        </thead>

        <tbody>
        <tr>
            <td><code>--rep_scripts</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>Répertoire où récupérer les bibliothèques utilisées</td>
        </tr>
        <tr>
            <td><code>--itop_serveur</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>Nom du serveur itop dans le fichier de conf des serveurs</td>
        </tr>
        <tr>
            <td><code>--o365_serveur</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>Nom du serveur 0365 dans le fichier de conf des serveurs</td>
        </tr>
        <tr>
            <td><code>--o365_serveur_sp</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td><code>--fichier_sortie</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td><code>--help</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Définit si on affiche l&#39;aide de la commande</td>
        </tr>
        </tbody>
    </table>

    <hr/>

    <Highlight language='bash' style={dark}>
        {`/TOOLS/php_customer/php_depot/Euclyde/export_mensuel/export_SDM.php \\
    --rep_scripts="value" \\
    --itop_serveur="value" \\
    --fichier_sortie="value"`}
    </Highlight>

    <table>
        <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Valeur par défaut</th>
            <th>Description</th>
        </tr>
        </thead>

        <tbody>
        <tr>
            <td><code>--rep_scripts</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>Répertoire où récupérer les bibliothèques utilisées</td>
        </tr>
        <tr>
            <td><code>--itop_serveur</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>Nom du serveur itop dans le fichier de conf des serveurs</td>
        </tr>
        <tr>
            <td><code>--fichier_sortie</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td><code>--help</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Définit si on affiche l&#39;aide de la commande</td>
        </tr>
        </tbody>
    </table>

    <h3>Plugin "itop"</h3>

    <Highlight language='bash' style={dark}>
        {`/TOOLS/php_customer/php_depot/Euclyde/itop/itop_manage_PDL_cassette_fibre.php \\
    --rep_scripts="value" \\
    --itop_serveur="value"`}
    </Highlight>

    <table>
        <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Valeur par défaut</th>
            <th>Description</th>
        </tr>
        </thead>

        <tbody>
        <tr>
            <td><code>--rep_scripts</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>Répertoire où récupérer les bibliothèques utilisées</td>
        </tr>
        <tr>
            <td><code>--itop_serveur</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>Nom du serveur itop dans le fichier de conf des serveurs</td>
        </tr>
        <tr>
            <td><code>--help</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Définit si on affiche l&#39;aide de la commande</td>
        </tr>
        </tbody>
    </table>

    <hr/>

    <Highlight language='bash' style={dark}>
        {`/TOOLS/php_customer/php_depot/Euclyde/itop/rapport_tickets_ouverts.php \\
    --rep_scripts="value" \\
    --itop_serveur="value" \\
    --o365_serveur_mail="value" \\
    --o365_serveur_message="value"`}
    </Highlight>

    <table>
        <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Valeur par défaut</th>
            <th>Description</th>
        </tr>
        </thead>

        <tbody>
        <tr>
            <td><code>--rep_scripts</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>Répertoire où récupérer les bibliothèques utilisées</td>
        </tr>
        <tr>
            <td><code>--itop_serveur</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>Nom du serveur itop dans le fichier de conf des serveurs</td>
        </tr>
        <tr>
            <td><code>--o365_serveur_mail</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td><code>--o365_serveur_message</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td><code>--help</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Définit si on affiche l&#39;aide de la commande</td>
        </tr>
        </tbody>
    </table>

    <hr/>

    <Highlight language='bash' style={dark}>
        {`/TOOLS/php_customer/php_depot/Euclyde/itop/synchronise_backup.php \\
    --rep_scripts="value" \\
    --itop_serveur="value" \\
    --veeam_serveur="value"`}
    </Highlight>

    <table>
        <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Valeur par défaut</th>
            <th>Description</th>
        </tr>
        </thead>

        <tbody>
        <tr>
            <td><code>--rep_scripts</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>Répertoire où récupérer les bibliothèques utilisées</td>
        </tr>
        <tr>
            <td><code>--itop_serveur</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>Nom du serveur itop dans le fichier de conf des serveurs</td>
        </tr>
        <tr>
            <td><code>--veeam_serveur</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>Nom du serveur veeam dans le fichier de conf des serveurs</td>
        </tr>
        <tr>
            <td><code>--help</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Définit si on affiche l&#39;aide de la commande</td>
        </tr>
        </tbody>
    </table>

    <hr/>

    <Highlight language='bash' style={dark}>
        {`/TOOLS/php_customer/php_depot/Euclyde/itop/synchronise_calendrier.php \\
    --rep_scripts="value" \\
    --itop_serveur="value" \\
    --o365_serveur="value"`}
    </Highlight>

    <table>
        <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Valeur par défaut</th>
            <th>Description</th>
        </tr>
        </thead>

        <tbody>
        <tr>
            <td><code>--rep_scripts</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>Répertoire où récupérer les bibliothèques utilisées</td>
        </tr>
        <tr>
            <td><code>--itop_serveur</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>Nom du serveur itop dans le fichier de conf des serveurs</td>
        </tr>
        <tr>
            <td><code>--o365_serveur</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>Nom du serveur 0365 dans le fichier de conf des serveurs</td>
        </tr>
        <tr>
            <td><code>--help</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Définit si on affiche l&#39;aide de la commande</td>
        </tr>
        </tbody>
    </table>

    <h3>Plugin "monitoring"</h3>

    <Highlight language='bash' style={dark}>
        {`/TOOLS/php_customer/php_depot/Euclyde/monitoring/parser_log.php \\
    --logfile="value" \\
    --logdir="value" \\
    --processus="value" \\
    --type_os="value" \\
    --message="value"`}
    </Highlight>

    <Highlight language='bash' style={dark}>
        {`/TOOLS/php_customer/php_depot/Euclyde/monitoring/parser_log_nagios.php \\
    --logfile="value" \\
    --logdir="value" \\
    --processus="value" \\
    --type_os="value" \\
    --message="value"`}
    </Highlight>

    <table>
        <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Valeur par défaut</th>
            <th>Description</th>
        </tr>
        </thead>

        <tbody>
        <tr>
            <td><code>--logfile</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td><code>--logdir</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td><code>--processus</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td><code>--type_os</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td><code>--message</code></td>
            <td><code>string</code></td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td><code>--help</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Définit si on affiche l&#39;aide de la commande</td>
        </tr>
        </tbody>
    </table>
</>);

export default function EuclydePhpFramework() {
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        Highlight.registerLanguage('bash', bash);
    }, []);

    return (<>
        <button onClick={() => setOpened(true)}>
            <div>
                <Title />
            </div>
        </button>

        <Dialog opened={opened}
                title={<Title />}
                onClose={() => setOpened(false)}
                render={DialogBody}
        />
    </>);
}