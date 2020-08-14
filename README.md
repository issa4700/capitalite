<div style="text-align: center;">
  <h1>Capitalite</h1>
  A lightweight portfolio tracker
  </div>
<hr />

## 🚀 Running
Before running the server, make sure you already have NodeJS and MongoDB setup. A local instance can be run with the following commands:
```bash
yarn
yarn start
```

## 🗄 Database Schema
```
portfolio ::
userID => users._id
stockExchange
tickerID
trxType (B/S)
trxDate
sharePrice
amountShares
trxFees

partners ::
_id
username
password
Name

Exchanges ::
_id
name

insiderTrx ::
userID => users._id
trxDate
trxType
amountUnits
```

## 🛠 Configuration
The configuration for the server can be found in the ```.env``` file located in the root of the server's directory.

## 🙏 OSS used 
* [Windmill Dashboard Theme](https://github.com/estevanmaito/windmill-dashboard)