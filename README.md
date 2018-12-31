# Timescreen

This is a fork of twitter-scraping by bpb27, https://github.com/bpb27/twitter_scraping, adding functionality from marsam/tweetshot.js - https://gist.github.com/marsam/82c68c5a42e6f4c97927

## Super quick TL;DR for people who know what they're doing

0) Copy `sample_api_keys.json` to `api_keys.json` and enter your API keys. Scripts require `selenium`, `tweepy`, `pandas`, `phantomjs` (node), and a webdriver in your `$PATH`.
1) edit `scrape.py` and choose a `user` to scrape near the top of the file.
2) Create a time window in which to store data by editing the `start` and `end` variables. Shorter windows work best, a year or less generally works well for most active users. 
3) Run `python3 scrape.py`. when finished, choose another date window if desired and run `scrape.py` again. (t: ~2-10 seconds per day of activity)
4) Edit the user variable in `get_metadata.py`, then run `python3 get_metadata.py`. (t: ~6 seconds for every 100 tweets) 
5) Edit the user variable in `tweetshot_driver.py`,then run `python3 tweetshot_driver.py`. (t: ~2 seconds per tweet)
6) CSV data will be in the `data/` folder and screenshots will be in `img/`

## Twitter Scraper

Twitter makes it hard to get all of a user's tweets (assuming they have more than 3200). This is a way to get around that using Python, Selenium, and Tweepy.

Essentially, we will use Selenium to open up a browser and automatically visit Twitter's search page, searching for a single user's tweets on a single day. If we want all tweets from 2015, we will check all 365 days / pages. This would be a nightmare to do manually, so the `scrape.py` script does it all for you - all you have to do is input a date range and a twitter user handle, and wait for it to finish.

The `scrape.py` script collects tweet ids. If you know a tweet's id number, you can get all the information available about that tweet using Tweepy - text, timestamp, number of retweets / replies / favorites, geolocation, etc. Tweepy uses Twitter's API, so you will need to get API keys. Once you have them, you can run the `get_metadata.py` script.

## Requirements

- basic knowledge on how to use a terminal
- Safari 10+ with 'Allow Remote Automation' option enabled in Safari's Develop menu to control Safari via WebDriver.
  - if on linux, you can use Chromedriver, Firefox, etc. just make sure the webdriver is in your path. See: https://techarena51.com/blog/install-selenium-linux-automate-web-tests/
- python3
  - to check, in your terminal, enter `python3`
  - if you don't have it, check YouTube for installation instructions
- pip or pip3
  - to check, in your terminal, enter `pip` or `pip3`
  - if you don't have it, again, check YouTube for installation instructions
- selenium (3.0.1)
  - `pip3 install selenium`
- tweepy (3.5.0)
  - `pip3 install tweepy`
- phantomjs (for taking screenshots)

## Running the scraper

- open up `scrape.py` and edit the user, start, and end variables (and save the file)
- run `python3 scrape.py`
- you'll see a browser pop up and output in the terminal
- do some fun other task until it finishes
- once it's done, it outputs all the tweet ids it found into `all_ids.json`
- every time you run the scraper with different dates, it will add the new ids to the same file
  - it automatically removes duplicates so don't worry about small date overlaps

## Troubleshooting the scraper

- do you get a `no such file` error? you need to cd to the directory of `scrape.py`
- do you get a driver error when you try and run the script?
  - open `scrape.py` and change the driver to use Safari() or Firefox()
    - if neither work, google the error (you probably need to install a new driver)
- does it seem like it's not collecting tweets for days that have tweets?
  - open `scrape.py` and change the delay variable to 2 or 3

## Getting the metadata

- first you'll need to get twitter API keys
  - sign up for a developer account here https://dev.twitter.com/
  - get your keys here: https://apps.twitter.com/
- put your keys into the `sample_api_keys.json` file
- change the name of `sample_api_keys.json` to `api_keys.json`
- open up `get_metadata.py` and edit the user variable (and save the file)
- run `python3 get_metadata.py`
- this will get metadata for every tweet id in `all_ids.json`
- it will create 4 files
  - `username.json` (master file with all metadata)
  - `username.zip` (a zipped file of the master file with all metadata)
  - `username_short.json` (smaller master file with relevant metadata fields)
  - `username.csv` (csv version of the smaller master file)

## Getting the screenshots

- for this part, you will need pandas, node.js and phantom.js:
  - `pip3 install pandas`
  - `[package-manager on your distro] install nodejs`
  - `npm install -g phantomjs`
- Edit the `user` variable in `tweetshot_driver.py`, then run `python3 tweetshot_driver.py`
  - the script will collect screenshot of every tweet that has been indexed in the data file, which has path information for each image
  - expect a little weirdness with embedded videos, especially vines; attached images may not be full-sized
  - there will be one image (~60kb) per tweet. Context will be captured for replies. The option to allow for not capturing this context is under development
