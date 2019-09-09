import Layout from '../components/layout/Layout'

const loginRouter = [
    {
        path: '/',
        name: 'default',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录'
        },
        component: () => import('../components/login/Login')
    }
];
const errorRouter = {
    path: '/error',
    component: Layout,
    children: [
        {
            path: '404',
            name: '404',
            meta: {
                title: '404'
            },
            component: () => import('../components/error/404')
        }
    ]
};
const digitalRouter = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: 'home',
                name: 'home',
                meta: {
                    title: '首页',
                    requireAuth: true  // 需要登录才能访问
                },
                component: () => import('../components/home/Home')
            }
        ]

    },{
        path: '/statistic',
        component: Layout,
        children: [
            {
                path: 'keywords',
                name: 'keywords',
                meta: {
                    title: '分词统计',
                    requireAuth: true,  // 需要登录才能访问
                    active: '/statistic/goods'   // 进入该路由时需要激活的菜单路由
                },
                component: () => import('../components/statistic/Keyword')
            },
            {
                path: 'comments/:goodsId',
                name: 'comments',
                meta: {
                    title: '评论详情',
                    requireAuth: true,  // 需要登录才能访问
                    active: '/statistic/goods'   // 进入该路由时需要激活的菜单路由
                },
                component: () => import('../components/statistic/Comment')
            },
            {
                path: 'goods',
                name: 'goods',
                meta: {
                    requireAuth: true,  // 需要登录才能访问
                    title: '商品列表'
                },
                component: () => import('../components/statistic/Goods')
            }
        ]

    }
];



export const routers = [
    ...loginRouter,
    errorRouter,
    ...digitalRouter
];