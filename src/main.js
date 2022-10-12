import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import TeamsList from "./components/teams/TeamsList.vue";
import UsersList from "./components/users/UsersList.vue";
import TeamMembers from "./components/teams/TeamMembers.vue";
import NotFound from "./components/nav/NotFound.vue";
import TeamFooter from "./components/teams/TeamFooter.vue";
import UserFooter from "./components/users/UserFooter.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", redirect: "/teams" }, //instead of redirect alias can be used in particular route but alias will not change the url
        {
            name: "teams",
            path: "/teams",
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


    next()
});

router.afterEach(function (to, from) {
    //sending analytics data

    console.log('Global afterEach', to, from)
})

const app = createApp(App);

app.use(router);

app.mount("#app");
