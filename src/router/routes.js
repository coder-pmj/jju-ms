import Layout from '@/components/Layout'
import Auditing from '@/views/Auditing'
import UserList from '@/views/UserList'
import StudentList from '@/views/StudentList'
import Login from '@/views/Login'
const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login,
        meta: {
            title: '管理员登录',
            keepAlive:false
        }
    },

    /* 最新审核页 */
    {
        path: '/auditing',
        component: Layout,
        children: [
            {
                path: '/',
                component: Auditing,
                meta: {
                    title: '最新审核',
                    keepAlive: false
                }
            }
        ]
    },
    
    /* 用户列表 */
    {
        path: '/userlist',
        component: Layout,
        children: [
            {
                path: '/',
                component: UserList,
                meta: {
                    title: '用户列表',
                    keepAlive:false
                }
            }
        ]
    },
    /* 学生列表 */
    {
        path: '/studentlist',
        component: Layout,
        children: [
            {
                path: '/',
                component: StudentList,
                meta: {
                    title: '学生列表',
                    keepAlive:false
                }
            }
        ]
    },
]
export default routes