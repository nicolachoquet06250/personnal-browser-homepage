#!/bin/bash

if [[ "$1" == "-m" ]] || [[ "$1" == "--message" ]];then
    message="$2"
else
    echo "Le message est obligatoire"
    2>&1
    exit;
fi

if [[ "$3" == "-t" ]] || [[ "$3" == "--type" ]];then
    type="$4"
else
    type="feature"
fi

tag_list=$(git tag);
tag_list=(${tag_list//\\n/ });
last_tag=""
for tag in "${tag_list[@]}"
do
    last_tag="$tag"
done

echo $last_tag

IFS='.'
read -ra tag_parts <<< "$last_tag"

tag_parts[0]=$(echo "${tag_parts[0]/v/}");

if [[ $type == "fix" ]];then
    tag_parts[1]=$(( ${tag_parts[1]} + 1 ))
elif [[ $type == "feature" ]];then
    tag_parts[0]=$(( ${tag_parts[0]} + 1 ))
    tag_parts[1]=0
fi

echo "v${tag_parts[0]}.${tag_parts[1]}"

log_list=$(git log --pretty=oneline);
log_list=(${log_list//\\n/ });

first_log="${log_list[0]}";

IFS=' '
read -ra values <<< "$first_log"
commit_id="${values[0]}"

git commit -m "$message";
git tag -a "v${tag_parts[0]}.${tag_parts[1]}" "$commit_id" -m "$message";
git push origin --tags;

