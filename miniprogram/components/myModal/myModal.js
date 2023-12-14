
Component({
  properties: {
      title: {
          type: String,
          value: '提示',
      },
      content: {
          type: String,
          value: '',
      }
  },//定义组件的属性
  methods: {
      cancel() {
          this.triggerEvent('cancel');
      },
      submit() {
          this.triggerEvent('submit', 'Code程序人生');//第一个参数是方法名，第二个参数是传递的参数
      }
  }
})