App({
  globalData: {
    // Theme colors
    theme: {
      primary: '#E8FF00',
      background: '#0A0A0A',
      surface: '#141414',
      elevated: '#1C1C1E',
      textPrimary: '#FFFFFF',
      textSecondary: 'rgba(255,255,255,0.6)',
      textTertiary: 'rgba(255,255,255,0.36)',
      border: 'rgba(255,255,255,0.08)',
      success: '#34D399',
      warning: '#FBBF24',
      error: '#F87171',
      info: '#60A5FA'
    },
    // User info
    userInfo: null,
    // Is logged in
    isLoggedIn: false,
    // API base URL
    apiBaseUrl: 'https://api.di-move-car.com',
    // App version
    version: '1.0.0'
  },

  onLaunch(options) {
    console.log('DI挪车 app launched', options);
    // Check login status on launch
    this.checkLoginStatus();
  },

  onShow(options) {
    console.log('DI挪车 app shown', options);
  },

  onHide() {
    console.log('DI挪车 app hidden');
  },

  onError(error) {
    console.error('DI挪车 app error:', error);
  },

  checkLoginStatus() {
    const token = wx.getStorageSync('token');
    const userInfo = wx.getStorageSync('userInfo');
    if (token && userInfo) {
      this.globalData.isLoggedIn = true;
      this.globalData.userInfo = userInfo;
    }
  },

  login(callback) {
    wx.login({
      success: (res) => {
        if (res.code) {
          // Send code to backend
          wx.request({
            url: `${this.globalData.apiBaseUrl}/login`,
            method: 'POST',
            data: { code: res.code },
            success: (result) => {
              if (result.data.success) {
                wx.setStorageSync('token', result.data.token);
                wx.setStorageSync('userInfo', result.data.userInfo);
                this.globalData.isLoggedIn = true;
                this.globalData.userInfo = result.data.userInfo;
                callback && callback(true);
              } else {
                callback && callback(false);
              }
            },
            fail: () => {
              callback && callback(false);
            }
          });
        } else {
          callback && callback(false);
        }
      },
      fail: () => {
        callback && callback(false);
      }
    });
  },

  logout() {
    wx.removeStorageSync('token');
    wx.removeStorageSync('userInfo');
    this.globalData.isLoggedIn = false;
    this.globalData.userInfo = null;
  }
});
