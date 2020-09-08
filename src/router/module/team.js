import Main from '@/components/main';
// 团队管理
export const team = [
  {
    path: '/team',
    name: 'Team',
    component: Main,
    meta: {
      title: '团队管理',
      icon: 'icon iconfont icondongtaijiazai'
    },
    children: [
      {
        path: '/team/team-list',
        name: 'TeamList',
        meta: {
          title: '团队列表',
          privilege: [
            { title: '查询', name: 'team-query' },
            { title: '详情', name: 'team-detail' }
          ]
        },
        component: () => import('@/views/team/team-list.vue')
      },
      {
        path: '/team/team-demo',
        name: 'TeamDemo',
        meta: {
          title: '占用'
        },
        component: () => import('@/views/team/team-demo.vue')
      },
      {
        path: '/team/team-detail',
        name: 'TeamDetail',
        meta: {
          title: '团队详情',
          hideInMenu:true
        },
        component: () => import('@/views/team/team-detail.vue')
      }
    ]
  }
];
