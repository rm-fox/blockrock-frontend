!pip install seaborn==0.11.0
!pip install plotly==4.12.0
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
import numpy as np


# Reading the data per each index


comps = ["andritz", "ATS", "Bawag", "CA_Immo", "DOCO", "Erste_Group", "Immofinanz", "Lenzing", "MayrMelnhof", "OMV", "OPost", "Raiffeisen", "SImmo", "Schoeller-Bleckmann", "TelekomAT", "Uniqa", "VIG", "Verbund", "voest","Wienerberger"]
tickers = ["ANDR","ATS", "BG", "CAI", "DOC", "EBS", "IIA", "LNZ", "MMK", "OMV", "POST", "RBI", "SPI", "SBO", "TKA", "UQA", "VIG", "VER", "VOE", "WIE"]
atx_comps = pd.DataFrame()

for i in range(0,19):
    comp = pd.read_csv("atx/"+str(comps[i]) + ".csv", delimiter = ";", decimal = ",",
        names = ["Date", str(tickers[i])], header = 1, index_col = "Date", parse_dates=True)

    atx_comps = pd.merge(atx_comps, comp, left_index = True, right_index=True, how = "outer") 

# Setting the date to run over

atx_comps = atx_comps["2010-10-20":"2023-10-20"]

# Loading data 

atx =  pd.read_csv("indices/atx_tr.csv", delimiter = ";", decimal = ".", names = ["Date", "ATX_TR"], usecols = [0,1], header = 0, index_col = "Date", parse_dates=True)
sp500 = pd.read_csv("indices/^GSPC.csv", names = ["Date", "SP500"], parse_dates=True, usecols = [0,1], index_col = "Date", header = 1)
dax = pd.read_csv("indices/^GDAXI.csv", names = ["Date", "DAX"], parse_dates=True, usecols = [0,1], index_col = "Date", header = 1)
nasdaq = pd.read_csv("indices/^IXIC.csv", names = ["Date", "NASDAQ"], parse_dates=True, usecols = [0,1], index_col = "Date", header = 1)

indices = pd.concat([atx, sp500, dax, nasdaq], join = "outer", axis = 1)['2010-10-19':]
indices.head()

# Calculating the return 

indices_rets = indices.pct_change()
indices_cumrets = indices_rets.add(1).cumprod().sub(1)*100

fig = px.line(indices_cumrets, x=indices_cumrets.index, y=indices_cumrets.columns, title='Cumulative Returns of Indices (2010-2020)')
fig.update_xaxes(title_text='Date')
fig.update_yaxes(title_text='Cumulative Return in %')
fig.show()

# Cumulative return  

atx_comps_returns = atx_comps.pct_change()
atx_comps_rets_cumprod = atx_comps_returns.add(1).cumprod().sub(1)*100

fig = px.line(atx_comps_rets_cumprod, x=atx_comps_rets_cumprod.index, y=atx_comps_rets_cumprod.columns, title='Cumulative Returns of ATX Stocks (2010-2020)')

fig.update_xaxes(title_text='Date')
fig.update_yaxes(title_text='Cumulative Return in %')

fig.show()

# Predicting based on historical data - covariance 

!pip install PyPortfolioOpt

from pypfopt import risk_models
from pypfopt import expected_returns
from pypfopt.expected_returns import ema_historical_return
from pypfopt.risk_models import exp_cov
from pypfopt.efficient_frontier import EfficientFrontier
from pypfopt.plotting import plot_efficient_frontier
from pypfopt.plotting import plot_weights
from pypfopt.cla import CLA

train = atx_comps_returns[:"2023-10-21"]
test = atx_comps_returns["2024-07-13":]

mu = expected_returns.ema_historical_return(train, returns_data = True, span = 500)
Sigma = risk_models.exp_cov(train, returns_data = True, span = 180)