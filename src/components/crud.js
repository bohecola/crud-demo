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
      this.emitter = new Emitter(this.$.uid);
    },
    created() {
      this.emitter.on('table.selection-change', selection => {
        this.selection.splice(0, this.selection.length, ...selection);
      });
    },
    mounted() {
      // Merge crud data
      const res = bootstrap(deepMerge(this, __crud));

      // Hooks by load
      this.$emit('load', res);

      // Window onresize
      window.removeEventListener('resize', function () { });
      window.addEventListener('resize', () => {
        this.emitter.emit('crud.resize');
      });
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
      },
      // Upsert add
      rowAdd() {
        this.emitter.emit('crud.add');
      },

      // Upsert edit
      rowEdit(data) {
        this.emitter.emit('crud.edit', data);
      },

      // Upsert append
      rowAppend(data) {
        this.emitter.emit('crud.append', data);
      },

      // Upsert close
      rowClose() {
        this.emitter.emit('crud.close');
      },

      // Row delete
      rowDelete(...selection) {
        // Get request function
        const reqName = this.dict.api.delete;

        let params = {
          ids: selection.map(e => e.id).join(',')
        };

        // Delete
        const next = params => {
          return new Promise((resolve, reject) => {
            this.$confirm(`??????????????????????????????????????????????????????`, '??????', {
              type: 'warning'
            })
              .then(res => {
                if (res === 'confirm') {
                  // Validate
                  if (!this.service[reqName]) {
                    return reject(`Request function '${reqName}' is not found`)
                  }

                  // Send request
                  this.service[reqName](params)
                    .then(res => {
                      this.$message.success(`????????????`);
                      this.refresh();
                      resolve(res);
                    })
                    .catch(err => {
                      this.$message.error(err);
                      reject(err);
                    });
                }
              })
              .catch(() => null);
          });
        };

        if (this.onDelete) {
          this.onDelete(selection, { next });
        } else {
          next(params);
        }
      },

      // Multi delete
      deleteMulti() {
        this.rowDelete.apply(this, this.selection || []);
      },

      // Open advSearch
      openAdvSearch() {
        this.emitter.emit('crud.open');
      },

      // close advSearch
      closeAdvSearch() {
        this.emitter.emit('crud.close');
      },

      // Refresh params replace
      paramsReplace(params) {
        const { pagination, search, sort } = this.dict;
        let a = { ...params };
        let b = { ...pagination, ...search, ...sort };

        for (let i in b) {
          // eslint-disable-next-line
          if (a.hasOwnProperty(i)) {
            if (i != b[i]) {
              a[`_${b[i]}`] = a[i];

              delete a[i];
            }
          }
        }

        for (let i in a) {
          if (i[0] === '_') {
            a[i.substr(1)] = a[i];

            delete a[i];
          }
        }

        return a;
      },

      // Service refresh
      refresh(newParams = {}) {
        // ????????????
        let params = this.paramsReplace(Object.assign(this.params, newParams));

        // Loading
        this.loading = true;

        // ???????????????
        let rd = (this.test.refreshRd = Math.random());

        // ????????????
        const done = () => {
          this.loading = false;
        };

        // ??????
        const render = (list, pagination) => {
          this.emitter.emit('crud.refresh', { list, pagination });
          done();
        }

        // ????????????
        const next = params => {
          return new Promise((resolve, reject) => {
            const reqName = this.dict.api.page;

            if (!this.service[reqName]) {
              done();
              return reject(`Request function '${reqName}' is not found`);
            }

            this.service[reqName](params)
              .then(res => {
                if (rd != this.test.refreshRd) {
                  return false;
                }

                if (isString(res)) {
                  return reject('Response error');
                }

                if (isArray(res)) {
                  render(res);
                } else if (isObject(res)) {
                  render(res.list, res.pagination);
                }

                resolve(res);
              })
              .catch(err => {
                console.error(err);
                this.$message.error(err);
                reject(err);
              })
              .done(() => {
                done();
                this.test.sortLock = true;
              });
          });
        };

        if (this.onRefresh) {
          return this.onRefresh(params, { next, done, render });
        } else {
          return next(params);
        }
      },
      
      // Layout again
      doLayout() {
        this.emitter.emit('resize');
      },

      done() {
        // Done Render
        this.test.process = true;
      }
    },
    render() {
      return <div class="cl-crud">{this.$slots.default()}</div>
    }
  }
}