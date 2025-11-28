class SourcesService {
  constructor() {
    this.sources = Array.from({length: 100}, (_, i) => ({
      id: `source_${i}`,
      daily: Math.random() * 500000
    }));
  }
  
  getAll() { return this.sources; }
  getTotal() { return this.sources.reduce((s, src) => s + src.daily, 0); }
}

module.exports = new SourcesService();
