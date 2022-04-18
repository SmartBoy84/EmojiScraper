DIR=emojis
CAR=cartridges
mkdir $CAR
cd $DIR

for D in *; do
if [ -d "${D}" ]; then
echo "Converting ${D}"
#mogrify -background black -format png ${D}/* && mogrify -depth 32 -alpha set -format bmp ${D}/* && rm ${D}/*.png

cd ..
echo $(ls $DIR/${D} | grep -e .bmp -e .BMP | wc -l) emojis available

./emojifier te $CAR/${D} $DIR/${D} 3 $(ls $DIR/${D} | grep -e .bmp -e .BMP | wc -l)
if [ $? -eq 1 ]; then ./emojifier te $CAR/${D} $DIR/${D} 1 $(ls $DIR/${D} | grep -e .bmp -e .BMP | wc -l); fi

cd $DIR
fi
done
