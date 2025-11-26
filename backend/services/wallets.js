class WalletsService {
  constructor() {
    this.wallets = Array.from({length: 100}, (_, i) => ({
      id: `wallet_${i}`,
      balance: Math.random() * 100000
    }));
  }
  
  getAll() { return this.wallets; }
  getTotal() { return this.wallets.reduce((s, w) => s + w.balance, 0); }
}

module.exports = new WalletsService();
