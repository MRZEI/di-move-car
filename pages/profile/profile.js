Page({
  data: {
    activeTab: 'profile',
    tabs: [
      { id: 'home', name: '首页', icon: 'home' },
      { id: 'profile', name: '我的', icon: 'profile' }
    ],
    userInfo: {
      name: '张先生',
      phone: '138****8888',
      verified: true,
      avatar: ''
    },
    vehicles: [
      {
        plate: '京A·88888',
        type: '小型汽车 · 蓝牌'
      },
      {
        plate: '沪B·66666',
        type: '小型汽车 · 新能源'
      }
    ],
    stats: {
      notifications: 28,
      successRate: '96%',
      rating: '4.9'
    },
    settings: {
      doNotDisturb: true
    }
  },

  onSettingTap: function(e) {
    var setting = e.currentTarget.dataset.setting;
    wx.showToast({
      title: '功能开发中',
      icon: 'none',
      duration: 1500
    });
  },

  onToggleChange: function(e) {
    var setting = e.currentTarget.dataset.setting;
    var currentValue = this.data.settings[setting];
    this.setData({
      ['settings.' + setting]: !currentValue
    });
  },

  onAddVehicle: function() {
    wx.showToast({
      title: '添加车辆功能开发中',
      icon: 'none',
      duration: 1500
    });
  },

  onLogout: function() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: function(res) {
        if (res.confirm) {
          wx.showToast({
            title: '已退出登录',
            icon: 'success',
            duration: 1500
          });
        }
      }
    });
  }
});