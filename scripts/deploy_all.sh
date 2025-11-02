#!/bin/bash

./deploy_local.sh 1 100
./deploy_local.sh 2 100
./deploy_local.sh 6 50  
./deploy_local.sh 26 50  

./deploy_local.sh 4 50
./deploy_local.sh 18 100
./deploy_local.sh 5 100
./deploy_local.sh 10 100

./deploy_local.sh 9 100
./deploy_local.sh 12 100
./deploy_local.sh 7 100
./deploy_local.sh 11 100

./deploy_local.sh 13 50
./deploy_local.sh 16 50
./deploy_local.sh 17 100

./deploy_local.sh 8 100


exit 0

for i in {1..6}
do
   ./deploy_local.sh 14 $i
done


for i in {1..3}
do
   ./deploy_local.sh 15 $i
done

