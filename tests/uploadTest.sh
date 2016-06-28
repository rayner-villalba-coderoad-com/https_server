#!/bin/bash

echo "UPLOAD FILES"
# read two variables
read -p "From : " from
read -p "To : " to

cd files

for((i=$from; i<=$to; i++))
do 
  echo "Upload file: "${i}.dat
  curl http://localhost:6666/upload --data-binary @${i}.dat -H "filename:${i}.dat"
done