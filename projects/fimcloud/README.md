# FimCloud: Fimfiction word frequency counting and visualization suite

This is a set of command line scripts and tools for gathering, analyzing, and visualizing text data from Fimfiction.

## Components

### Scripts

* `fim_grabber.py` - downloads story text from Fimfiction. It can grab the entire text from all stories for a given
  Fimfiction user, or alternatively a configuration file can be supplied to tell it which authors and/or stories to
  grab.

* `frequency_analyzer.py` - outputs word frequency data for an input text. Its intended use is to receive the output
  from `fim_grabber.py`, but it will work on any input.

* `html_cloud.py` - given a set of string frequencies, generates an HTML file which in turn generates an SVG "word
   cloud" when loaded in a browser. This is intended to receive the output from `frequency_analyzer.py`.

### Classes

* `url_fetcher.py` - an importable class used by `fim_grabber.py` to fetch data from Fimfiction.

* `data_cacher.py` - an importable class used by `url_fetcher.py` to cache fetched pages on the filesystem.

## Usage

To generate the HTML cloud file for all stories by the Fimfiction user Wanderer D:

    python fim_grabber.py -a "Wanderer D" | python frequency_analyzer.py | python html_cloud.py > "Wanderer D.html"

This will download the text of all published stories by Wanderer D, feed it into the frequency analyzer, and
subsequently feed that into the cloud file generator, saving the result to "Wanderer D.html" in the current directory.

(The above assumes that you're using a Bash shell, but it's probably not that much different on other Linux shells. If
you're using Windows, you'll probably have more difficulty.)

## Requirements

* Python 3
* Python modules:
  * Beautiful Soup 4 <https://www.crummy.com/software/BeautifulSoup/>
  * Requests <http://docs.python-requests.org/en/master/>
* A modern web browser (Google Chrome or Firefox should work fine)

### Installing the Python modules

Installation instructions can be found for Beautiful Soup 4 and Requests at the URLs listed above. However, they're both
straightforward to install. If you have `pip`, you should be able to get both with just:

    pip install beautifulsoup4
    pip install requests
