/*
Дана функция, которая получает из API данные о финансовых показателях облигаций
за заданную дату по массиву идентификаторов облигаций (ISIN):

getBondsData({
date: '20180120',
isins: ['XS0971721963', 'RU000A0JU4L3']
});
Результат:
[{
isin: 'XS0971721963',
data: {...}
}, {
isin: 'RU000A0JU4L3',
data: {...}
}]

https://eodhistoricaldata.com/knowledgebase/bonds-fundamentals-and-historical-api/
const TEST_BOND = {
  Isin: 'US910047AG49',
  Cusip: '910047464',
  Name: 'UNITED CONTL HUMS INC 6% 01Dec2020',
  UpdateDate: '2019-01-18',
  WKN: 'A1HS3T',
  Sedol: 'BFV4Y03',
  FIGI: 'B8G00538GHT4',
  Currency: 'USD',
  Coupon: '6.000',
  Price: '103.05',
  LastTradeDate: '2019-01-18',
  Maturity_Date: '2020-12-01',
  YieldToMaturity: '4.266',
  Callable: 'No',
  NextCallDate: null,
  MinimumSettlementAmount: '1000 USD',
  ParIntegralMultiple: '1000 USD',

  ClassificationData: {
    BondType: 'US Corporate Debentures',
    DebtType: 'Senior Unsecured Note',
    IndustryGroup: 'Industrial',
    IndustrySubGroup: 'Transportation',
    SubProductAsset: 'CORP',
    SubProductAssetType: 'Corporate Bond'
  },

  Rating: {
    MoodyRating: 'Ba3',
    MoodyRatingUpdateDate: '2017-01-23',
    SPRating: 'BB',
    SPRatingUpdateDate: '2018-04-16'
  },
  IssueData: {
    IssueDate: '2013-11-08',
    OfferingDate: '2013-11-01',
    FirstCouponDate: '2014-06-01',
    FirstTradingDay: '2013-11-08',
    CouponPaymentFrequency: 'Semi-Annual',
    Issuer: 'United Continental Holdings Inc.',
    IssuerDescription: 'United Continental Holdings Inc. is an airline holding company. The Company',
    IssuerCountry: 'USA',
    IssuerURL: null
  }
};


https://www.factentry.com/data-delivery/bondpdf-api/
  "_id": "AWVnZggDqb-pZvjxf2nH",
   "country": "France",
   "isin_regs": "FR0013342219",
   "bbg_ticker": "BPCECB 1.5225 06/14/38 EMTN",
   "entity_name": "BPCE SFH",
   "issue_currency": "EUR",
   "figi_regs": "BBG00L343G93",
   "cusip_regs": null,
   "amount_issued": 50000000,
   "issuance_coupon": 1.52,
   "maturity_date": "2038-06-14",
   "figi_144a": null,
   "doc_type": "Final Terms",
   "isin_144a": null,
   "bond_type": "Fixed",
   "issue_date": "2018-06-14",
   "cusip_144a": null,
   "sector": "Financial Services",
   "cloudpath": null
*/

// http://cbonds.ru/emissions/issue/17979
// https://www.finanz.ru/obligacii/united_airlines_holdings_inc-obligaciya-2020-us910047ag49
// https://bondevalue.com/webapp/home#graph-yield

export interface Bond {
  Isin: string;
  Cusip: string,

  Name: string;
  UpdateDate: string,
  Sedol: string,
  FIGI: string,
  Currency: string,
  Coupon: string,
  Price: string,
  Maturity_Date: string,

  IssueData: {
    Issuer: string,
    IssuerCountry: string,
    [other: string]: any,
  }

  [other: string]: any,
}

export enum BondDatePeriodType {
  Week = 'Week',
  Month = 'Month',
  Quarter = 'Quarter',
  Year = 'Year',
  Max = 'Max',
}

export enum BondGroupBy {
  Yield = 'Yield', // 0.0..30.0 - доходность (Coupon) + доход рыночной стоимости
  // todo @ANKU @LOW - не понятно то ли числовая, то ли процентная
  Spread = 'Spread', // 0.0..1.0% - разница между покупкой и продажей
  Price = 'Price', // 1..150$
}
