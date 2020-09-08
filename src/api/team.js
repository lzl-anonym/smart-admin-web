import { postAxios, getAxios } from '@/lib/http';
export const teamApi = {

  // 分页查询团队列表
  getList: (data) => {
    return postAxios('/team/query',data);
  },

  // 获取团队详情
  getTeamDetail: (teamId) => {
    return getAxios(`/team/query/${teamId}`);
  },

  // 审核团队
  auditTeam: (data) => {
    return postAxios('/team/audit',data);
  },


};

