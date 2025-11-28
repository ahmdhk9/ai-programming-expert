class DeploymentService {
  constructor() {
    this.platforms = [
      'Replit', 'Vercel', 'Firebase', 'Railway', 'Render', 'Netlify'
    ].map(name => ({ name, status: 'active' }));
  }
  
  getAll() { return this.platforms; }
  deployAll() { return { status: 'deploying', platforms: this.platforms }; }
}

module.exports = new DeploymentService();
