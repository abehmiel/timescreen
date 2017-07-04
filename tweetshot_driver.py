import subprocess
import pandas as pd
from pathlib import Path
import scrape

user = scrape.user()

df = pd.read_csv("data/{}.csv".format(user))
        
urls = df["url"].values
filepath = df["filepath"].values

for item in zip(urls, filepath):
    if not Path(item[1]).is_file():
        subprocess.call(["phantomjs", "tweetshot.js", item[0], item[1]])
