import subprocess
import pandas as pd
from pathlib import Path

user = 'dril'

df = pd.read_csv("data/{}.csv".format(user))
        
urls = df["url"].values
filepath = df["img_file"].values

for item in zip(urls, filepath):
    if not Path(item[1]).is_file():
        subprocess.call(["phantomjs", "tweetshot.js", item[0], item[1]])
