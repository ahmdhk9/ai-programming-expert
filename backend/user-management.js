// نظام إدارة المستخدمين الشامل
class UserManagement {
  constructor() {
    this.users = {};
    this.tracking = {};
  }

  // إضافة مستخدم
  createUser(userData) {
    const userId = Date.now().toString();
    this.users[userId] = {
      id: userId,
      email: userData.email,
      name: userData.name,
      role: userData.role || 'user',
      status: 'active',
      createdAt: new Date(),
      subscription: userData.subscription || 'free',
      features: this.getFeaturesByRole(userData.role || 'user'),
      permissions: this.getPermissionsByRole(userData.role || 'user')
    };

    this.initTracking(userId);
    return this.users[userId];
  }

  // حذف مستخدم
  deleteUser(userId) {
    if (this.users[userId]) {
      this.users[userId].status = 'deleted';
      delete this.tracking[userId];
      return { success: true };
    }
    return { error: 'User not found' };
  }

  // تعديل المستخدم
  updateUser(userId, updates) {
    if (!this.users[userId]) return { error: 'User not found' };

    Object.assign(this.users[userId], updates);
    
    // تحديث الميزات والأذونات حسب الدور الجديد
    if (updates.role) {
      this.users[userId].features = this.getFeaturesByRole(updates.role);
      this.users[userId].permissions = this.getPermissionsByRole(updates.role);
    }

    return this.users[userId];
  }

  // الحصول على الميزات حسب الدور
  getFeaturesByRole(role) {
    const features = {
      admin: [
        'unlimitedProjects', 'unlimitedStorage', 'advancedAI',
        'customBranding', 'apiAccess', 'webhook', 'teamManagement',
        'analytics', 'autoScaling', 'prioritySupport', 'whiteLabel'
      ],
      pro: [
        'unlimitedProjects', '100gb storage', 'advancedAI',
        'apiAccess', 'analytics', 'prioritySupport'
      ],
      user: [
        'limitedProjects', '5gb storage', 'basicAI', 'communitySupport'
      ]
    };
    return features[role] || features.user;
  }

  // الحصول على الأذونات حسب الدور
  getPermissionsByRole(role) {
    const permissions = {
      admin: ['create', 'read', 'update', 'delete', 'manage'],
      pro: ['create', 'read', 'update', 'delete'],
      user: ['create', 'read', 'update']
    };
    return permissions[role] || permissions.user;
  }

  // تهيئة التتبع
  initTracking(userId) {
    this.tracking[userId] = {
      userId,
      location: null,
      ip: null,
      device: null,
      lastActive: new Date(),
      sessions: [],
      activities: []
    };
  }

  // تتبع النشاط
  trackActivity(userId, activity) {
    if (!this.tracking[userId]) this.initTracking(userId);

    this.tracking[userId].activities.push({
      type: activity.type,
      description: activity.description,
      timestamp: new Date(),
      details: activity.details
    });

    this.tracking[userId].lastActive = new Date();
  }

  // تتبع الموقع والـ IP
  trackLocation(userId, locationData) {
    if (!this.tracking[userId]) this.initTracking(userId);

    this.tracking[userId].location = locationData.location;
    this.tracking[userId].ip = locationData.ip;
    this.tracking[userId].device = locationData.device;
  }

  // الحصول على إحصائيات المستخدم
  getUserStats(userId) {
    const user = this.users[userId];
    const tracking = this.tracking[userId] || {};

    if (!user) return { error: 'User not found' };

    return {
      user,
      location: tracking.location,
      ip: tracking.ip,
      device: tracking.device,
      lastActive: tracking.lastActive,
      activityCount: (tracking.activities || []).length,
      recentActivities: (tracking.activities || []).slice(-10)
    };
  }

  // قائمة جميع المستخدمين
  getAllUsers() {
    return Object.values(this.users).filter(u => u.status !== 'deleted');
  }

  // البحث عن مستخدم
  searchUsers(query) {
    return Object.values(this.users).filter(u =>
      u.email.includes(query) || u.name.includes(query)
    );
  }

  // منح ميزات إضافية
  grantFeature(userId, feature) {
    if (!this.users[userId]) return { error: 'User not found' };

    if (!this.users[userId].features.includes(feature)) {
      this.users[userId].features.push(feature);
    }

    this.trackActivity(userId, {
      type: 'feature_grant',
      description: `ميزة ${feature} تم منحها`,
      details: { feature }
    });

    return this.users[userId];
  }

  // سحب ميزات
  revokeFeature(userId, feature) {
    if (!this.users[userId]) return { error: 'User not found' };

    this.users[userId].features = this.users[userId].features.filter(f => f !== feature);

    this.trackActivity(userId, {
      type: 'feature_revoke',
      description: `ميزة ${feature} تم سحبها`,
      details: { feature }
    });

    return this.users[userId];
  }
}

module.exports = new UserManagement();
