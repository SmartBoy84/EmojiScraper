#rename 's/\.([^.]+)$/.\L$1/' * && mogrify -background black -alpha remove -alpha off -format PNG *.png[0] && mogrify -depth 32 -alpha set -format bmp *.PNG && rm *.png && rm *.PNG

DIR=emojis
CAR=cartridges
mkdir $CAR
cd $DIR

for D in *; do
if [ -d "${D}" ]; then
echo "Converting ${D}"

# convert files
cd ${D}
rename 's/\.([^.]+)$/.\L$1/' * # rename all upper case extensions to lower case
mogrify -background black -alpha remove -alpha off -format PNG *.png[0] # remove transparency
mogrify -depth 32 -alpha set -format bmp *.PNG # make bmp
rm *.png && rm *.PNG # remove redundant png files

# make buffers
cd ../..
echo $(ls $DIR/${D} | grep -e .bmp -e .BMP | wc -l) emojis available

./emojifier te $CAR/${D} $DIR/${D} 3 $(ls $DIR/${D} | grep -e .bmp -e .BMP | wc -l)
if [ $? -eq 1 ]; then ./emojifier te $CAR/${D} $DIR/${D} 1 $(ls $DIR/${D} | grep -e .bmp -e .BMP | wc -l); fi
echo " "
cd $DIR
fi
done
