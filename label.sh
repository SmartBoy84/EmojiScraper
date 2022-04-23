i=1
for FILE in textures/*;
do
mv $FILE "textures/$i.png"
i=$((i+1))
done
