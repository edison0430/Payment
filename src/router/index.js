import Vue from 'vue'
import VueRouter from 'vue-router'
import Step1 from '../views/Step1.vue'
import Step2 from '../views/Step2.vue'
import Step3 from '../views/Step3.vue'

Vue.use(VueRouter)
const routes = [{
        path: '/',
        redirect: '/checkout/step1'
    },
    {
        path: '/checkout/step1',
        name: 'step1',
        component: Step1
    },
    {
        path: '/checkout/step2',
        name: 'step2',
        component: Step2,
        props: true
    },
    {
        path: '/checkout/step3',
        name: 'step3',
        component: Step3,
        props: true
    },
    {
        path: '*',
        redirect: '/checkout/step1'
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, _from, next) => {
    // 當 route 切換為 step2 時，檢查當下的 params 是否含有 payType 屬性。
    // 若沒有則導回預設首頁。 
    //（主要是避免於 step2 頁面按下重整後，payType 屬性會消失，頁面無法繼續往下的問題。）
    if (to.name === 'step2') {
        if (to.params.payType) {
            next();
        } else {
            next('/');
        }
    } else {
        next();
    }
})

export default router