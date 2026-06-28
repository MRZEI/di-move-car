Component({
  properties: {
    tabList: {
      type: Array,
      value: [
        { text: '首页', icon: '/assets/home.png' },
        { text: '通知', icon: '/assets/notify.png' },
        { text: '我的', icon: '/assets/profile.png' }
      ]
    },
    active: {
      type: Number,
      value: 0
    }
  },

  methods: {
    onTabTap: function(e) {
      const index = e.currentTarget.dataset.index;
      if (index !== this.data.active) {
        this.triggerEvent('change', { index });
      }
    }
  }
});
