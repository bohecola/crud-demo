<template>
  <div class="demo">
    <cl-crud>
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

const userList = [];

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
