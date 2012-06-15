<?php

//////////////////////////////
// Connect to the Database //
////////////////////////////
$conn = 'mysql:host=sociotechnical.ischool.drexel.edu;dbname=twitteranalyze';
$username = 'tweeterfour';
$password = 'seniordesign';

try {
	$db = new PDO($conn, $username, $password);

} catch (PDOException $e) {
	$error_message = $e->getMessage();
	echo "<p>An error occurred while connecting to the database: $error_message </p>";
}


////////////////
// Functions //
//////////////
function dumpArray($array) {

	echo "<pre>";
	print_r($array);
	echo "</pre>";
}


function getDateCountByTag($tag) {
	global $db;

	$query = '
		SELECT date, count
		FROM Hashtag_Stats_Dim
		WHERE text = :tag
		AND date != "2012-04-02"
		AND date !=  "2012-05-10"';

	try {
		$statement = $db->prepare($query);
		$statement->bindValue('tag', $tag);
		$statement->execute();

		$result = $statement->fetchAll();
		$statement->closeCursor();

		return $result;

	} catch (PDOException $e) {
		$error_message = $e->getMessage();
		display_db_error($error_message);
	}
}


function createJSArray($data) {
	$jsArray = "\t<script type=\"text/javascript\">\n";
	$jsArray .= "\t\t\t\tvar dynamicData = [ ";
	foreach ($data as $d) {
		$date = $d["date"];
		$count = $d["count"];

		$jsArray .= "{date:\"$date\",count:$count}";
		if(next($data) == true) {
			$jsArray .= ", ";
		}
	}
	$jsArray .= " ]\n";
	$jsArray .= "\t\t\t</script>\n";

	return $jsArray;
}


function createJSDomain($data, $hashtag) {
	$combined = array();
	foreach ($data as $d) {
		$combined[] = $d["count"];
	}


    $min = min($combined);
    $max = max($combined);

    if($min==$max) {
        echo "<h2>No data for #$hashtag :(</h2>";
        return;
    }

    $range = ceil(($max-$min)/10);

    $counter = 1;
    $rangeArray = range($min,$max-1,$range);
    $legendData = "\t\t\t\tvar legendData = [ {id:0, range:'No Data'}, ";
    foreach($rangeArray as $n) {
        $legendData .= "{id:$counter, range:'" . strval(ceil($n)) . " - " . strval(floor($n+$range)) . "'}";
        $counter++;
        if($counter < 11) {
            $legendData .= ", ";
        }
    }
    $legendData .= " ]\n";

    //echo $min . " " . $max ." " . $range;
    //dumpArray($rangeArray);

	$jsDomain = "\t<script type=\"text/javascript\">\n";
	$jsDomain .= "\t\t\t\tvar topic = '" . $hashtag . "';\n";
	$jsDomain .= "\t\t\t\tvar minValue = " . min($combined) . ";\n";
	$jsDomain .= "\t\t\t\tvar maxValue = " . max($combined) . ";\n";
    $jsDomain .= $legendData;
	$jsDomain .= "\t\t\t</script>\n";

	return $jsDomain;
}


///////////
// Main //
/////////
if(isset($_GET["hashtag"])) {
	$hashtag = trim($_GET["hashtag"]);
} else {
	$hashtag = "economy";
}

$heatMap = getDateCountByTag($hashtag);

//dumpArray($heatMap);
//echo min($heatMap);

if(empty($heatMap)) {
    $noData = true;
}



?>
<!DOCTYPE html>
<html>
	<head>
		<title>TweetMap</title>
		<script type="text/javascript" src="js/d3.v2.js"></script>
		<link type="text/css" rel="stylesheet" href="css/colorbrewer.css"/>
		<link type="text/css" rel="stylesheet" href="css/heatmap.css"/>
	</head>
	<body>

		<form action="original-heatmap.php" method="GET">
			Enter hashtag #<input type="text" name="hashtag"/>
            <input type="submit" value="Go!"/>
		</form>

		<h1>Tweet HeatMap for #<?php echo $hashtag; ?></h1>
        <p>Please click on a day to view associated news stories!</p>
        <div id="wrapper">
            <div id="chart"></div>
            <div id="legend"></div>
        </div>

        <?php if(!$noData){ ?>

		<?php echo createJSArray($heatMap); ?>
		<?php echo createJSDomain($heatMap, $hashtag); ?>

		<script type="text/javascript" src="js/heatmap.js"></script> <!-- Main JS file containing visualization code - AJM -->

        <?php } else { ?>

        <h2>No data for <?php echo "#$hashtag"; ?> :(</h2>

        <?php } ?>

	</body>
</html>

