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
                    requireAuth: true,  // 需要登录才能访问
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

    }
];



export const routers = [
    ...loginRouter,
    errorRouter,
    ...digitalRouter
];
