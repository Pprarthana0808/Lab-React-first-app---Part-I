const { StockPortfolio } = require("./stockPortfolio");

describe("StockPortfolio", () => {
  test("2.1: portfolio starts empty (no symbols, no shares)", () => {
    const p = new StockPortfolio();
    expect(p.uniqueSymbolsCount()).toBe(0);
    expect(p.sharesOf("GMR")).toBe(0);
  });

  test("2.2: portfolio answers whether it is empty", () => {
    const p = new StockPortfolio();
    expect(p.isEmpty()).toBe(true);

    p.buy("GMR", 1);
    expect(p.isEmpty()).toBe(false);
  });

  test("2.3: make a purchase, buy adds shares for a symbol (and updates)", () => {
    const p = new StockPortfolio();
    p.buy("GMR", 5);
    expect(p.sharesOf("GMR")).toBe(5);

    p.buy("GMR", 3);
    expect(p.sharesOf("GMR")).toBe(8);
  });

  test("2.4: make a scale. sell subtracts shares for a symbol", () => {
    const p = new StockPortfolio();
    p.buy("RBLX", 10);
    p.sell("RBLX", 4);
    expect(p.sharesOf("RBLX")).toBe(6);
  });

  test("2.5: uniqueSymbolsCount counts distinct tickers (not total shares)", () => {
    const p = new StockPortfolio();
    p.buy("GMR", 5);
    p.buy("RBLX", 10);
    expect(p.uniqueSymbolsCount()).toBe(2);

    p.buy("GMR", 100);
    expect(p.uniqueSymbolsCount()).toBe(2);
  });

  test("2.6: portfolio keeps only owned symbols (no zero-share entries)", () => {
    const p = new StockPortfolio();
    p.buy("GMR", 2);
    expect(p.uniqueSymbolsCount()).toBe(1);

    p.sell("GMR", 2);
    expect(p.uniqueSymbolsCount()).toBe(0);
    expect(p.sharesOf("GMR")).toBe(0);
    expect(p.isEmpty()).toBe(true);
  });

  test("2.7: shares exists for a given symbol and if it isn't in the portfolio returns 0", () => {
    const p = new StockPortfolio();
    expect(p.sharesOf("NOPE")).toBe(0);

    p.buy("AAPL", 7);
    expect(p.sharesOf("NOPE")).toBe(0);
  });

  test("2.8: cannot sell more shares than owned, throws specific error message", () => {
    const p = new StockPortfolio();
    p.buy("GMR", 3);

    expect(() => p.sell("GMR", 4)).toThrow(
      "Not possible to sell this number of shares."
    );

    expect(() => p.sell("RBLX", 1)).toThrow(
      "Not possible to sell this number of shares."
    );
  });

  /*
    Reflection on TDD:
    Yes, I was able to follow test-first approach going over the red-green-refactor. Writing a failing test first helped me clarify each requirement
    ,like removing a symbol when shares reach zero and throwing errors for oversell. I wanted to 
    jump ahead and implement multiple requirements at once. But I knew I needed to keep changes minimal per failing test to make the design clearer and understandable.
    My opinion about the TDD practice after this assignment, it feels useful for building confidence and preventing regressions, but feels slower.
  */
});
