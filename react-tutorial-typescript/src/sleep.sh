echo "first input is... $1"

a=0

while [ $a -lt 1000  ]
do
    sleep 1
    echo $a
    a=`expr $a + 1`
done
