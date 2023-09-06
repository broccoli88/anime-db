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
            path: '/:page?',
            name: 'home',
            component: HomeView,

        },
        {
            path: '/genre/:genre?/:page?',
            name: 'genre',
            component: () => import('../views/GenreView.vue'),
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
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('../views/NotFoundView.vue')
        },
    ]
})

router.beforeEach(async (to, from, next) => {
    const animeStore = useAnimeStore(),
        { selectedAnime, currentPage } = storeToRefs(animeStore)

    currentPage.value = to.params.page && to.params.page !== '1' ? parseInt(to.params.page) : 1;
    console.log(currentPage.value)

    if (to.name === 'home') {
        // animeStore.clearSearchInput()
        await animeStore.fetchFullAnimeList()
    }
    if (to.name === 'details') selectedAnime.value = await useFetchById(to.params.id)
    if (to.name === 'genre') {
        // console.log(to.params.genre)
        // animeStore.clearSearchInput()
        await animeStore.fetchAnimeByGenre(to.params.genre, currentPage.value)
    }
    next()

})

export default router
