// pages/home/home.js
const app = getApp();

Page({
  data: {
    userInfo: {
      nickName: '车主用户',
      avatarUrl: ''
    },
    
    vehicles: [
      {
        id: 1,
        plateNumber: '京A·88888',
        isDefault: true
      },
      {
        id: 2,
        plateNumber: '沪B·66666',
        isDefault: false
      }
    ],
    
    notifications: [
      {
        id: 1,
        type: 'blocked',
        title: '您的车辆被挡',
        subtitle: '京C·12345 挡在您车位 · 3分钟前',
        status: 'pending',
        plateNumber: '京C·12345',
        timeAgo: '3分钟前'
      },
      {
        id: 2,
        type: 'success',
        title: '挪车成功',
        subtitle: '京A·88888 已挪走 · 2小时前',
        status: 'resolved',
        plateNumber: '京A·88888',
        timeAgo: '2小时前'
      }
    ],
    
    stats: {
      monthlyNotifications: 12,
      avgResponseMinutes: 5,
      successRate: '98%'
    }
  },

  onLoad: function (options) {
    console.log('Home page loaded');
    this.initializePageData();
  },

  onShow: function () {
    console.log('Home page shown');
    this.refreshPageData();
  },

  initializePageData: function () {
    const globalUserInfo = app.globalData?.userInfo;
    if (globalUserInfo) {
      this.setData({
        userInfo: globalUserInfo
      });
    }
  },

  refreshPageData: function () {
    this.updateNotificationBadge();
  },

  updateNotificationBadge: function () {
    const unreadCount = app.globalData?.unreadCount || 0;
    
    if (unreadCount > 0) {
      wx.setTabBarBadge({
        index: 1,
        text: unreadCount > 99 ? '99+' : String(unreadCount)
      });
    } else {
      wx.removeTabBarBadge({
        index: 1
      });
    }
  },

  goToNotifyMove: function () {
    wx.navigateTo({
      url: '/pages/notify-move/notify-move'
    });
  },

  goToNotifyPage: function () {
    wx.switchTab({
      url: '/pages/notify-move/notify-move'
    });
  },

  goToManageVehicles: function () {
    wx.navigateTo({
      url: '/pages/profile-qr/profile-qr'
    });
  },

  goToMoveDetail: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/move-detail/move-detail?id=' + id
    });
  },

  onPullDownRefresh: function () {
    setTimeout(() => {
      this.refreshPageData();
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 1500
      });
    }, 1000);
  },

  onShareAppMessage: function () {
    return {
      title: 'DI挪车 - 一键通知车主挪车',
      path: '/pages/home/home'
    };
  }
});
