<?php




$min = 2200;
$max = 5500;

$range = (5500-2200)/10;

$counter = 0;
foreach(range($min,($max-$range),$range) as $n) {
    echo "{id:$counter, range:'" . strval($n) . " - " . strval($n+$range) . "'}, <br>";
    $counter++;
}


?>