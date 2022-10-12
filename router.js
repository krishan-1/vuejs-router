import { createRouter, createWebHistory } from "vue-router";

import TeamsList from "./pages/TeamsList.vue";
import UsersList from "./pages/UsersList.vue";
import TeamMembers from "./src/components/teams/TeamMembers.vue"
import NotFound from "./pages/NotFound.vue";
import TeamFooter from "./pages/TeamFooter.vue";
import UserFooter from "./pages/UserFooter.vue";



const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", redirect: "/teams" }, //instead of redirect alias can be used in particular route but alias will not change the url
        {
            name: "teams",
            path: "/teams",
            meta: {
                needAuth: true
            },
            components: {
                default: TeamsList,
                footer: TeamFooter,
            },
            children: [
                {
                    name: "team-members",
                    path: ":teamId",
                    component: TeamMembers,
                    props: true,
                },
            ], //children for nesting routing
        }, // our-domain.com/teams => TeamsList
        {
            path: "/users",
            components: {
                default: UsersList,
                footer: UserFooter,
            },
        }, //alias: '/' ,
        { path: "/:notFound(.*)", component: NotFound }, //for url.com/fjdksjfds it will redirect to team
    ],
    linkActiveClass: "active", //for css shortcut for active class

    // scrollBehavior(to, from, savedPosition){},
    scrollBehavior(to, from, savedPosition) {
        console.log(to, from, savedPosition)
        if (savedPosition) {
            return savedPosition;
        }
        return { left: 0, top: 0 }
    },
});
router.beforeEach(function (to, from, next) {
    console.log('global beforeEach ====>')
    console.log(to, from)
    //======example
    // if (to.name === 'team-members') {
    //     next();

    // } else {
    //     next({
    //         name: 'team-members', params: { teamId: 't2' }
    //     })
    // }

    if (to.meta.needsAuth) {
        console.log('needs auth')
        next();
    } else {

        next()
    }
});

router.afterEach(function (to, from) {
    //sending analytics data

    console.log('Global afterEach', to, from)
})



export default router;