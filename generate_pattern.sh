infile="download.png"

h2=`convert $infile -format "%[fx:round(h/2)]" info:`

convert $infile \( -clone 0 -roll +0+$h2 \) +append -write mpr:sometile +delete -size 1000x1000 tile:mpr:sometile output.png
