const express = require('express');
const router = express.Router();

class AuthService {
  constructor() {
    this.users = [];
  }

  register(name, email, password) {
    if (this.users.find(u => u.email === email)) {
      return { success: false, message: 'البريد موجود بالفعل' };
    }

    const user = {
      id: Date.now(),
      name,
      email,
      password, // في الإنتاج استخدم bcrypt
      createdAt: new Date()
    };

    this.users.push(user);
    return { success: true, user };
  }

  login(email, password) {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (!user) {
      return { success: false, message: 'البريد أو كلمة المرور خاطئة' };
    }

    const token = `token_${Date.now()}`;
    return { success: true, token, user: { id: user.id, name: user.name, email: user.email } };
  }

  getUserByEmail(email) {
    return this.users.find(u => u.email === email);
  }
}

const authService = new AuthService();

// Routes
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const result = authService.register(name, email, password);
  res.json(result);
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const result = authService.login(email, password);
  res.json(result);
});

router.get('/google', (req, res) => {
  res.json({ message: 'تحويل إلى Google OAuth' });
});

module.exports = router;
