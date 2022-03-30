export default {
  name: 'cl-error-message',

  prop: {
    title: String
  },

  setup(prop) {
    return () => {
      return <el-alert title={prop.title} type="error"></el-alert>;
    };
  }
}