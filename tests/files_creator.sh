#!/bin/bash
# read two variables
read -p "From : " from
read -p "To : " to

cd files

for((i=$from; i<=$to; i++))
do 
  #filename = ray${i}.dat 
  #echo $filename
  #if [ ! -e $filename ]
  #then 
    #echo "Enter here"
    # Create the file
    touch ${i}.dat
    # Generate random password and append to file 
    openssl rand -base64 32 >> ${i}.dat
  #fi
  
done