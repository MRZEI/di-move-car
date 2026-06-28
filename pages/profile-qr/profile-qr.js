// profile-qr.js - 挪车二维码页面逻辑

const app = getApp();

Page({
  data: {
    userInfo: {
      name: '张先生',
      phone: '138****8888',
      avatar: ''
    },
    
    vehicles: [
      {
        id: 1,
        plate: '京A·88888',
        type: '小型汽车 · 蓝牌'
      },
      {
        id: 2,
        plate: '沪B·66666',
        type: '小型汽车 · 新能源'
      }
    ],
    
    selectedVehicle: {
      id: 1,
      plate: '京A·88888',
      type: '小型汽车 · 蓝牌'
    },
    
    stats: {
      notifyCount: '28',
      successRate: '96%',
      rating: '4.9'
    },
    
    qrGenerated: false
  },

  onLoad: function(options) {
    if (options.vehicleId) {
      const vehicleId = parseInt(options.vehicleId);
      const vehicle = this.data.vehicles.find(v => v.id === vehicleId);
      if (vehicle) {
        this.setData({
          selectedVehicle: vehicle
        });
      }
    }
  },

  onGenerateQR: function() {
    const that = this;
    
    wx.showLoading({
      title: '生成中...',
      mask: true
    });
    
    setTimeout(function() {
      wx.hideLoading();
      
      that.setData({
        qrGenerated: true
      });
      
      wx.showToast({
        title: '生成成功',
        icon: 'success',
        duration: 2000
      });
    }, 1000);
  },

  onChangeVehicle: function() {
    const that = this;
    const vehicles = this.data.vehicles;
    const itemList = vehicles.map(v => v.plate);
    
    wx.showActionSheet({
      itemList: itemList,
      success: function(res) {
        const index = res.tapIndex;
        const selectedVehicle = vehicles[index];
        
        that.setData({
          selectedVehicle: selectedVehicle,
          qrGenerated: false
        });
        
        wx.showToast({
          title: '已切换到 ' + selectedVehicle.plate,
          icon: 'success',
          duration: 2000
        });
      }
    });
  },

  onShareQR: function() {
    const selectedVehicle = this.data.selectedVehicle;
    
    wx.showShareMenu({
      withShareTicket: true
    });
    
    return {
      title: '挪车二维码 - ' + selectedVehicle.plate,
      path: '/pages/profile-qr/profile-qr?vehicleId=' + selectedVehicle.id
    };
  },

  onAddVehicle: function() {
    wx.showToast({
      title: '添加车辆功能开发中',
      icon: 'none',
      duration: 1500
    });
  },

  onSettingTap: function(e) {
    wx.showToast({
      title: '功能开发中',
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
  },

  onShareAppMessage: function() {
    return this.onShareQR();
  }
});
