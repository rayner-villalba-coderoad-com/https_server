#!/bin/bash

echo "Download FILES"
# read two variables
read -p "From : " from
read -p "To : " to
URL = "http://10.100.0.170:6666/download/"
#cd files

for((i=$from; i<=$to; i++))
do 
  #echo "http://10.100.0.170:6666/download/"${i}.dat
  curl -O "http://10.100.0.170:6666/download/"${i}.dat 
  
  #&
done