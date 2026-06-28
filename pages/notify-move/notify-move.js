// pages/notify-move/notify-move.js

Page({
  data: {
    // 通知列表数据
    notifications: [
      {
        id: '1',
        badge: '被挡通知',
        badgeClass: 'red',
        cardBorderClass: 'card-border-urgent',
        time: '3分钟前',
        title: '您的车位被京C·12345占用',
        location: '朝阳区望京SOHO B2层',
        status: '待处理',
        statusClass: 'urgent',
        type: 'urgent',
        filterType: 'pending'
      },
      {
        id: '2',
        badge: '已通知车主',
        badgeClass: 'warning',
        cardBorderClass: 'card-border-warning',
        time: '15分钟前',
        title: '京A·88888 已收到挪车通知',
        location: '',
        status: '处理中',
        statusClass: 'warning',
        type: 'warning',
        filterType: 'notified'
      },
      {
        id: '3',
        badge: '挪车成功',
        badgeClass: 'success',
        cardBorderClass: 'card-border-success',
        time: '2小时前',
        title: '京D·55555 已成功挪车',
        location: '',
        status: '已完成',
        statusClass: 'success',
        type: 'success',
        filterType: 'completed'
      },
      {
        id: '4',
        badge: '我发起的',
        badgeClass: 'info',
        cardBorderClass: 'card-border-info',
        time: '昨天 14:30',
        title: '通知京E·77777 挪车',
        location: '',
        status: '已通知',
        statusClass: 'info',
        type: 'info',
        filterType: 'notified'
      }
    ],
    
    // 筛选标签数据
    filterTabs: [
      { key: 'all', text: '全部' },
      { key: 'pending', text: '待处理' },
      { key: 'notified', text: '已通知' },
      { key: 'completed', text: '已处理' }
    ],
    
    // 当前选中的筛选条件
    activeFilter: 'all',
    
    // 筛选后的通知列表
    filteredNotifications: [],
    
    // 通知总数
    notificationCount: 4,
    
    // 标签栏激活状态
    tabList: [
      { text: '首页', icon: '/assets/icons/home.png', inactiveIcon: '/assets/icons/home-outline.png' },
      { text: '通知', icon: '/assets/icons/notify.png', inactiveIcon: '/assets/icons/notify-outline.png' },
      { text: '我的', icon: '/assets/icons/profile.png', inactiveIcon: '/assets/icons/profile-outline.png' }
    ]
  },

  onLoad: function() {
    this.updateFilteredNotifications();
  },

  // 筛选标签点击事件
  onFilterTap: function(e) {
    const filter = e.currentTarget.dataset.filter;
    this.setData({
      activeFilter: filter
    });
    this.updateFilteredNotifications();
  },

  // 更新筛选后的通知列表
  updateFilteredNotifications: function() {
    const { notifications, activeFilter } = this.data;
    
    if (activeFilter === 'all') {
      this.setData({
        filteredNotifications: notifications,
        notificationCount: notifications.length
      });
    } else {
      const filtered = notifications.filter(item => item.filterType === activeFilter);
      this.setData({
        filteredNotifications: filtered,
        notificationCount: filtered.length
      });
    }
  },

  // 通知卡片点击事件
  onNotificationTap: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/move-detail/move-detail?id=' + id
    });
  },

  // 标签栏点击事件处理
  onTabTap: function(e) {
    const index = e.currentTarget.dataset.index;
    
    if (index === 0) {
      wx.switchTab({
        url: '/pages/home/home'
      });
    } else if (index === 2) {
      wx.switchTab({
        url: '/pages/profile/profile'
      });
    }
  }
});
