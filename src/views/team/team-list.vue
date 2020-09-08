<template>
  <div>
    <Card class="warp-card" dis-hover>
      <Form
        :model="searchform"
        class="tools"
        inline
        ref="searchform"
        v-privilege="'user-login-log-search'"
      >
        <FormItem prop="startDate">
          <DatePicker
            placeholder="开始日期"
            style="width: 200px"
            type="date"
            v-model="searchform.startDate"
          ></DatePicker>
        </FormItem>
        <FormItem prop="endDate">
          <DatePicker
            placeholder="结束日期"
            style="width: 200px"
            type="date"
            v-model="searchform.endDate"
          ></DatePicker>
        </FormItem>
        <FormItem prop="userName">
          <Input placeholder="请输入团队昵称" type="text" v-model="searchform.teamNickname"></Input>
        </FormItem>

        <FormItem>
          <ButtonGroup>
            <Button @click="search" icon="ios-search" type="primary">查询</Button>
            <Button @click="reset" icon="md-refresh" type="default">重置</Button>
          </ButtonGroup>
        </FormItem>
      </Form>
      <Table :columns="columns" :data="data" :loading="loading"></Table>
      <Page
        :current="searchform.pageNum"
        :page-size="searchform.pageSize"
        :page-size-opts="[10, 20, 30, 50, 100]"
        :total="pageTotal"
        @on-change="changePage"
        @on-page-size-change="changePageSize"
        show-elevator
        show-sizer
        show-total
        style="margin:24px 0;text-align:right;"
      ></Page>
    </Card>
  </div>
</template>

<script>
  import { teamApi } from '@/api/team';
  import { TEAM_STATUS } from '@/constants/team';
  export default {
    name: 'teamList',
    components: {},
    props: {},
    data() {
      return {
        loading: false,

        // 初始化
        queryParamBackup: {},

        // 检索条件
        searchform: {
          startDate: '',
          endDate: '',
          pageNum: 1,
          pageSize: 10,
          searchCount: true,
          sort: false,
          teamNickname: ''
        },
        pageTotal: 0,
        // table表头
        columns: [
          {
            title: '团队昵称',
            key: 'teamNickname'
          },
          {
            title: '团队简介',
            key: 'teamIntro'
          },
          {
            title: '团长昵称',
            key: 'nickName'
          },
          {
            title: '审核状态',
            key: 'auditState',
            render: (h, param) => {
              console.log(param.row.auditState)
              return h('span', this.$enum.getDescByValue('TEAM_STATUS', param.row.auditState));
            }
          },
          {
            title: '创建时间',
            key: 'createTime'
          },
          {
            title: '更新时间',
            key: 'updateTime'
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 200,
            className: 'action-hide',
            render: (h, params) => {
              let btns = [
                {
                  title: '详情',
                  directives: [
                    {
                      name: 'privilege',
                      value: 'team-detail'
                    }
                  ],
                  action: () => {
                    this.$router.push({
                      name:'TeamDetail',
                      params:{team:params.row}
                    })
                  }
                }
              ];
              return this.$tableAction(h, btns);
            }
          }
        ],
        // table数据
        data: []
      };
    },
    computed: {},
    watch: {},
    filters: {},
    created() {},

    // 钩子函数
    mounted() {
      Object.assign(this.queryParamBackup, this.searchform);
      this.getTeamList();
    },
    methods: {
      // 查询团队列表
      async getTeamList() {
        try {
          this.loading = true;
          let result = await teamApi.getList(this.searchform);
          this.loading = false;
          this.data = result.data.list;
          this.pageTotal = result.data.total;
        } catch (e) {
          console.error(e);
          this.loading = false;
        }
      },
      // 翻页
      changePage(pageNum) {
        this.searchform.pageNum = pageNum;
        this.getTeamList();
      },
      // 改变一页展示数
      changePageSize(pageSize) {
        this.searchform.pageNum = 1;
        this.searchform.pageSize = pageSize;
        this.getTeamList();
      },
      // 搜索
      search() {
        this.searchform.pageNum = 1;
        this.getTeamList();
      },
      // 重置
      reset() {
        Object.assign(this.searchform, this.queryParamBackup);
        this.getTeamList();
      },
      // 删除日志
      async deleteLog(id) {
        this.$Spin.show();
        await userLogApi.deleteUserLoginLog(id);
        this.$Spin.hide();
        this.$Message.success('删除成功');
        this.getUserLoginLogPage();
      }
    }
  };
</script>
