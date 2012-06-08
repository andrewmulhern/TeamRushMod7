<?php

function dumpArray($array) {

	echo "<pre>";
	print_r($array);
	echo "</pre>";
}

$topic = $_GET["topic"];
$date = $_GET["date"];

$feedUrl = "https://news.google.com/news/feeds?q=$topic&output=rss";
echo $feedUrl;
$rawFeed = file_get_contents($feedUrl);
$xml = new SimpleXmlElement($rawFeed);

//$date = "06/07/12";

echo "<h2>News for $topic on $date:</h2>";

foreach ($xml->channel->item as $item)
{

	dumpArray($item);
	
	$articleDate = date( 'm/d/y', strtotime($item->pubDate));

	echo $articleDate;

	if($date == $articleDate) {

		/*$article = array();
		$article['title'] = $item->title;
		$article['date'] = $articleDate;

		dumpArray($article);*/

		echo $item->description;
	}

}



?>
