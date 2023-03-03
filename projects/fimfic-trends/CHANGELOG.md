## 1.7.0
* Add year range inputs to zoom the chart
* Add moving average analysis (although I didn't use it in the end as it's not as useful as the rolling total).
* Update with fimfarchive-20230301 data.

## 1.6.1
* Update the compact index generator to ignore fics that are no longer available on Fimfiction.

## 1.6.0
* Update the compact index generator to be able to process the full Fimfarchive index.json file without needing it to be reduced first.
* Change the compact format to remove redundant `date` and `tags` keys for fic data (the date and tag ids are now stored as a flat list for each fic)
* Update with fimfarchive-20221201 data.

## 1.5.0
* Add event markers
* Disable rolling average and rolling average derivative (they aren't very useful or meaningful measures)
* Update with fimfarchive-20220601 data.

## 1.4.0
* Update with fimfarchive-20211201 data.

## 1.3.2
* Update with fimfarchive-20210901 data.

## 1.3.1
* Update with fimfarchive-20181201 data.
* Add dynamic resizing of chart.
* Update UTIL.js to new version.

## 1.3.0
* Add cumulative cutoff selector
* Remove "Show trends button", make trend display automatic
* Remove chart type selector, always use line chart

## 1.2.0
* Add line chart mode

## 1.1.0
* Style improvements

## 1.0.0
* First release - tag selector, stacked chart mode
