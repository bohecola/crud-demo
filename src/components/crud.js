import { deepMerge, isArray, isString, isObject } from '@/utils';
import { bootstrap } from '@/app';
import Emitter from '@/utils/mitt';
import '@/assets/css/index.scss';

export default function ({ __crud }) {
  return {
    name: 'cl-crud',
    componentName: 'ClCrud',
    props: {
      name: String,
      onDelete: Function,
      onRefresh: Function
    },
    emits: ['load'],
    provide() {
      return {
        crud: this,
        mitt: this.emitter
      };
    },
    data() {
      return {
        service: null,
        loading: false,
        selection: [],
        test: {
          refreshRd: null,
          sortLock: false,
          process: false
        },
        permission: {
          update: true,
          page: true,
          info: true,
          list: true,
          add: true,
          delete: true
        },
        dict: {
          api: {
            list: 'list',
            add: 'add',
            update: 'update',
            delete: 'delete',
            info: 'info',
            page: 'page'
          },
          pagination: {
            page: 'page',
            size: 'size'
          },
          search: {
            keyWord: 'keyWord',
            query: 'query'
          },
          sort: {
            order: 'order',
            prop: 'prop'
          }
        },
        params: {
          page: 1,
          size: 20
        },
        fn: {
          permission: null
        },
        event: {}
      };
    },
    beforeCreate() {

    },
    created() {

    },
    mounted() {

    },
    methods: {
      getPermission(key) {
        switch (key) {
          case 'edit':
          case 'update':
            return this.permission['update'];
          default:
            return this.permission[key];
        }
      }
    },
    render() {
      return <div class="cl-crud">{this.$slots.default()}</div>
    }
  }
}