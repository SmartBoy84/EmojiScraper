DIR=emojis

cd $DIR

for D in *; do
if [ -d "${D}" ]; then
echo "Converting ${D}"
mogrify -background black -format png ${D}/* && mogrify -depth 32 -alpha set -format bmp ${D}/* && rm ${D}/*.png
fi
done
