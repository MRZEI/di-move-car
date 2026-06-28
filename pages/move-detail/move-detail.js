Page({
  data: {
    notification: {
      id: 'N202401150001',
      plate: '京C·12345',
      carType: '小型汽车 · 蓝牌',
      blockTime: '14:30',
      status: 'pending',
      location: {
        address: '朝阳区望京SOHO B2-156',
        floor: 'B2层',
        area: 'A区',
        spot: '156号车位'
      },
      timeline: [
        {
          title: '发起通知',
          time: '今天 14:32',
          status: 'completed',
          desc: ''
        },
        {
          title: '通知已送达',
          time: '今天 14:33',
          status: 'completed',
          desc: '短信+推送已发送'
        },
        {
          title: '等待车主响应',
          time: '进行中',
          status: 'pending',
          desc: ''
        }
      ],
      phone: '13800138000'
    }
  },

  onLoad: function(options) {
    if (options.id) {
      this.setData({
        'notification.id': options.id
      });
    }
  },

  onBackTap: function() {
    wx.navigateBack({
      delta: 1,
      fail: function() {
        wx.switchTab({
          url: '/pages/notify-move/notify-move'
        });
      }
    });
  },

  onRemindAgain: function() {
    wx.showLoading({
      title: '正在发送...',
      mask: true
    });

    setTimeout(function() {
      wx.hideLoading();
      wx.showToast({
        title: '已发送通知',
        icon: 'success',
        duration: 2000
      });
    }, 1500);
  },

  onCallPhone: function() {
    var phone = this.data.notification.phone;
    wx.makePhoneCall({
      phoneNumber: phone,
      fail: function() {
        wx.showToast({
          title: '拨打失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  onShareAppMessage: function() {
    return {
      title: 'DI挪车 - 快捷挪车服务',
      path: '/pages/move-detail/move-detail'
    };
  }
});
