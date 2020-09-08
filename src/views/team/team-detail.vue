<template>
    <div class="warp-card">
      <div slot="title" class="card-title">基本信息</div>
      <Form inline :label-width="100">
        <Row>
          <Col :md="8">
            <FormItem label="团队昵称：">
              <span v-text="team.teamNickname"></span>
            </FormItem>
          </Col>
          <Col :md="8">
            <FormItem label="团队简介：">
              <span v-text="team.teamIntro"></span>
            </FormItem>
          </Col>
          <Col :md="8">
            <FormItem label="团长昵称：">
              <span v-text="team.nickName"></span>
            </FormItem>
          </Col>
          <Col :md="8">
            <FormItem label="创建时间：">
              <span v-text="team.createTime"></span>
            </FormItem>
          </Col>
          <Col :md="8">
            <FormItem label="更新时间：">
              <span v-text="team.updateTime"></span>
            </FormItem>
          </Col>
          <Col :md="8">
            <FormItem label="当前状态：">
              <span v-text="this.$enum.getDescByValue('TEAM_STATUS', team.auditState)" ></span>
            </FormItem>
          </Col>
        </Row>
      </Form>

      <Button @click="rejected(team)" type="error">驳回</Button>
      <Button @click="pass(team)" type="success">通过</Button>

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
      //消息信息
      return {
        team: {}
      };
    },
    mounted() {
      this.team = this.$route.params.team;
      console.log(this.team);
      this.getTeamDetail(this.team.teamId);
    },
    methods: {
      // 获取通知详情
      async getTeamDetail(teamId) {
        try {
          let result = await teamApi.getTeamDetail(teamId);
          this.data = result.data;
        } catch (e) {
          console.error(e);
        }
      },

      // 审核通过
      pass(team) {
        try {
          let result =teamApi.auditTeam({
            teamId:team.teamId,
            auditState:2
          });
          alert("审核成功");
        } catch (e) {
          console.error(e);
        }
      },

      // 审核驳回
      rejected(team){
        try {
          let result =teamApi.auditTeam({
            teamId:team.teamId,
            auditState:3
          });
          alert("驳回成功");
        } catch (e) {
          console.error(e);
        }
      }

    }

  };
</script>

