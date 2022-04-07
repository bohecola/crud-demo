<template>
  <div class="demo">
    <cl-crud @load="onLoad">
      <el-row>
        <cl-table
          ref="table"
          :border="false"
          :columns="columns"
          row-key="id"
          @selection-change="onSelectionChange"
        >
          <template #column-name="{scope}"> ` {{ scope.row.name }} ` </template>

					<template #slot-btn>
						<el-button type="text" size="mini" @click="onClickTest">测试按钮</el-button>
					</template>

					<template #append>
						<p style="text-align: center;margin: 10px">Append</p>
					</template>

					<template #empty>
						自定义空态
					</template>
        </cl-table>
      </el-row>
    </cl-crud>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';

const userList = [
  {
    id: 1,
    name: '刘一',
    process: 42.2,
    createTime: '2019年09月02日',
    price: 75.99,
    salesRate: 52.2,
    status: 1,
		images: ["https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/1.jpg"],
		children: [
			{
				id: 6,
				name: "刘二",
				process: 42.2,
				createTime: "2019年09月02日",
				price: 232.49,
				salesRate: 52.2,
				status: 1,
				images: [
					"https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/1.jpg"
				]
			}
		]
  },
  {
		id: 2,
		name: "陈二",
		process: 35.2,
		createTime: "2019年09月05日",
		price: 242.1,
		salesRate: 72.1,
		status: 1,
		images: ["https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/2.jpg"]
	},
	{
		id: 3,
		name: "张三",
		process: 10.2,
		createTime: "2019年09月12日",
		price: 74.11,
		salesRate: 23.9,
		status: 0,
		images: ["https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/3.jpg"]
	},
	{
		id: 4,
		name: "李四",
		process: 75.5,
		createTime: "2019年09月13日",
		price: 276.64,
		salesRate: 47.2,
		status: 0,
		images: ["https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/4.jpg"]
	},
	{
		id: 5,
		name: "王五",
		process: 25.4,
		createTime: "2019年09月18日",
		price: 160.23,
		salesRate: 28.3,
		status: 1,
		images: ["https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/5.jpg"]
	}
];

const testService = {
  page: p => {
    console.log('GET[page]', p);
    return Promise.resolve({
      list: userList.slice((p.page - 1) * p.size, p.page * p.size),
      pagination: {
        page: p.page,
        size: p.size,
        total: 5
      }
    });
  }
}

export default defineComponent({
  name: 'app',
  setup() {
    const state = reactive({
      columns: [
        { type: 'selection', align: 'center', width: 60 },
        {
          label: '#',
          type: 'index',
          align: 'center'
        },
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '收入',
          prop: 'price',
          align: 'center'
        },
        {
          type: 'op',
          align: 'center',
          layout: ['edit', 'delete', 'slot-btn']
        }
      ]
    });

    return state;
  },
  
  methods: {
    onLoad({ ctx, app }) {
      ctx.service(testService).done();
      app.refresh({});
    },
    onSelectionChange(selection) {
      console.log(selection);
    }
  }
})

</script>

<style lang="scss">
html,
body,
#app,
.demo {
	height: 100%;
	overflow: hidden;
}

* {
	padding: 0;
	margin: 0;
}
</style>
