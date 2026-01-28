class StockPortfolio {
  constructor() {
    this._holdings = new Map();
  }

  isEmpty() {
    return this._holdings.size === 0;
  }

  buy(symbol, shares) {
    const current = this._holdings.get(symbol) ?? 0;
    const next = current + shares;
    this._holdings.set(symbol, next);
  }

  sell(symbol, shares) {
    const current = this._holdings.get(symbol) ?? 0;
    if (shares > current) {
      throw new Error("Not possible to sell this number of shares.");
    }
    const next = current - shares;
    if (next === 0) {
      this._holdings.delete(symbol);
    } else {
      this._holdings.set(symbol, next);
    }
  }

  uniqueSymbolsCount() {
    return this._holdings.size;
  }

  sharesOf(symbol) {
    return this._holdings.get(symbol) ?? 0;
  }
}

module.exports = { StockPortfolio };
