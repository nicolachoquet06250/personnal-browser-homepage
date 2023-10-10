#!/bin/bash

[[ "${DEBUG}" == "" ]] && DEBUG="0";

if [[ "$1" == "push" ]];then
    type=""
    if [[ "$2" == "-m" ]] || [[ "$2" == "--message" ]];then
        message="$3"

        if [[ "$4" == "-t" ]] || [[ "$4" == "--type" ]];then
            type="$5"
        fi
    else
        message="$(git log -1 --format=%s)"

        if [[ "$2" == "-t" ]] || [[ "$2" == "--type" ]];then
            type="$3"
        fi
    fi

    if [[ type == "" ]];then
        type="feature"

        IFS=':'
        read -ra message_parts <<< "$message"
        IFS=''

        if [[ "${message_parts[0]}" == "Feature" ]] || [[ "${message_parts[0]}" == "feature" ]];then
            type="feature"
        elif [[ "${message_parts[0]}" == "Fix" ]] || [[ "${message_parts[0]}" == "Bug" ]] || [[ "${message_parts[0]}" == "fix" ]] || [[ "${message_parts[0]}" == "bug" ]];then
            type="fix"
        fi
    fi

#     get all git tags
    tag_list=$(git tag --sort=-version:refname);
    tag_list=(${tag_list//\\n/ });
#     get last tag
    last_tag="${tag_list[0]}"

#     split last tag from '.' and remove 'v' for get 2 parts of version
    IFS='.'
    read -ra tag_parts <<< "$last_tag"
    tag_parts[0]=$(echo "${tag_parts[0]/v/}");

#     increment version in function of type of push
    if [[ $type == "fix" ]];then
        tag_parts[1]=$(( ${tag_parts[1]} + 1 ))
    elif [[ $type == "feature" ]];then
        tag_parts[0]=$(( ${tag_parts[0]} + 1 ))
        tag_parts[1]=0
    fi

#     get all git logs
    log_list=$(git log --pretty=oneline);
    log_list=(${log_list//\\n/ });
#     get last git log
    first_log="${log_list[0]}";

#     split last log from ' ' for get first part of log with commit id
    IFS=' '
    read -ra values <<< "$first_log"
    commit_id="${values[0]}"

#     run git commands
    [[ "${DEBUG}" == "1" ]] && command="echo" || command="git";

    $command commit -m "$message";
    $command tag -a "v${tag_parts[0]}.${tag_parts[1]}" "$commit_id" -m "$message";
    $command push origin --tags;
elif [[ "$1" == "pull-env" ]];then
    if [[ "$2" != "-u" ]] && [[ "$2" != "--url" ]];then
        echo "Erreur : L'url du fichier de variables d'environnements est obligatoire"
        2>&1
        exit;
    fi

    split_env_file_url="$3";

    IFS='/';
    read -ra values <<< "$split_env_file_url";
    remote_file_name="";
    for v in ${values[@]}
    do
        remote_file_name="$v";
    done
    IFS='';

    env_file_url="$3";

    echo $env_file_url;
    echo $remote_file_name;

    wget "$env_file_url";
    mv "$remote_file_name" .env
elif [[ "$1" == "push-env" ]];then
    if [[ "$2" != "-s" ]] && [[ "$2" != "--ssh" ]];then
        echo "Erreur : L'adresse de connexion ssh est obligatoire"
        2>&1
        exit;
    fi
    ssh_address="$3"

    if [[ "$4" != "-p" ]] && [[ "$4" != "--project" ]];then
        echo "Erreur : Le nom du projet est obligatoire"
        2>&1
        exit;
    fi
    project_name="$5"

    environment=""
    remote_file_name=""
    ssh_password=""
    if [[ "$6" == "-e" ]] || [[ "$6" == "--environment" ]];then
        if [[ "$7" == "preprod" ]] || [[ "$7" == "prod" ]];then
            environment="${7}"
        fi

        if [[ "$8" == "-rfn" ]] || [[ "$8" == "--remote-file-name" ]];then
            remote_file_name="$9"
        else
            remote_file_name="env-${environment}.txt"
        fi

        if [[ "$10" != "-pass" ]] && [[ "$10" == "--password" ]];then
            ssh_password="$11"
        fi
    else
        if [[ "$6" == "-rfn" ]] || [[ "$6" == "--remote-file-name" ]];then
            remote_file_name="$7"
        else
            remote_file_name="env.txt"
        fi

        if [[ "$8" != "-pass" ]] && [[ "$8" == "--password" ]];then
            ssh_password="$9"
        fi
    fi

    local_file_name=".env.local"

    if [[ "$ssh_password" == "" ]];then
        scp "./${local_file_name}" "${ssh_address}:/home/nicolas-choquet/www/env-files/${project_name}/${remote_file_name}"
    else
        sshpass -p "$ssh_password" scp "./${local_file_name}" "${ssh_address}:/home/nicolas-choquet/www/env-files/${project_name}/${remote_file_name}"
    fi
elif [[ "$1" == "" ]] || [[ "$1" == "help" ]];then
    echo "bash ${pwd}/scripts/deploy.sh push [-m|--message \"commit message\"=\"last commit message\"] [-t|--type \"fix|feature\"=\"feature\"]";
    echo "bash ${pwd}/scripts/deploy.sh pull-env -u|--url \"remote env file url\"";
    echo "bash ${pwd}/scripts/deploy.sh push-env -s|--ssh \"ssh address\" -p|--project \"project name\" [-e|--environment \"preprod|prod\"=""] [-rfn|--remote-file-name \"remote file name\"="env-\$environment"] [-pass|--password \"ssh password if has\"]";
else
    echo "Erreur : subcommand \"$1\" not found";
    2>&1
    exit;
fi
# deploy.sh push-env -s "nicolas-choquet@ssh-nicolas-choquet.alwaysdata.net"

