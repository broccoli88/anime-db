import { createRouter, createWebHistory } from 'vue-router'
import { useAnimeStore } from '../stores/useAnimeStore'
import { useFetchById } from '../api/useFetchById'
import HomeView from '../views/HomeView.vue'
import { storeToRefs } from 'pinia'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior() { return { top: 0 } },
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,

        },
        {
            path: '/genre',
            name: 'genre',
            component: () => import('../views/GenreView.vue')
        },
        {
            path: '/user-list',
            name: 'user-list',
            component: () => import('../views/UserListView.vue')
        },
        {
            path: '/details/:id',
            name: 'details',
            component: () => import('../views/DetailsView.vue'),
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    const animeStore = useAnimeStore(),
        { selectedAnime } = storeToRefs(animeStore)

    if (to.name === 'home') animeStore.clearSearchInput()
    if (to.name === 'details') selectedAnime.value = await useFetchById(to.params.id)
    next()

})

export default router
