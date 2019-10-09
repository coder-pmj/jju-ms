import router from '@/router'
router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.
    if (to.meta.title) {
        document.title = to.meta.title
    }

    if (to.path == '/userlist') {
        next()
    } else {
        next()
    }

})