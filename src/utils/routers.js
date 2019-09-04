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
        meta: {
            requireAuth: true,  // 需要登录才能访问
        },
        children: [
            {
                path: 'home',
                name: 'home',
                meta: {
                    title: '首页'
                },
                component: () => import('../components/home/Home')
            }
        ]

    }, {
        path: '/user',
        component: Layout,
        meta: {
            requireAuth: true,  // 需要登录才能访问
        },
        children: [
            {
                path: 'roles',
                name: 'roles',
                meta: {
                    title: '用户角色'
                },
                component: () => import('../components/user/Roles')
            }
        ]

    }, {
        path: '/statistic',
        component: Layout,
        meta: {
            requireAuth: true,  // 需要登录才能访问
        },
        children: [
            {
                path: 'keywords',
                name: 'keywords',
                meta: {
                    title: '评论统计'
                },
                component: () => import('../components/statistic/Keywords')
            },
            {
                path: 'comments',
                name: 'comments',
                meta: {
                    title: '评论统计'
                },
                component: () => import('../components/statistic/comments')
            },
            {
                path: 'goods',
                name: 'goods',
                meta: {
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