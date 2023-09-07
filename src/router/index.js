import HomeView from '../views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useFetchById } from '../api/useFetchById'
import { useAnimeStore } from '../stores/useAnimeStore'
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
            path: '/search/:query/:page?',
            name: 'search',
            component: () => import('../views/SearchView.vue')
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
        { selectedAnime, currentPage, searchedPhrase } = storeToRefs(animeStore)

    currentPage.value = to.params.page && to.params.page !== '1' ? parseInt(to.params.page) : 1;

    if (to.name !== 'search') searchedPhrase.value = null
    if (to.name !== 'details') selectedAnime.value = null
    if (to.name === 'home') await animeStore.fetchFullAnimeList()
    if (to.name === 'details') selectedAnime.value = await useFetchById(to.params.id)
    if (to.name === 'genre') await animeStore.fetchAnimeByGenre(to.params.genre, to.params.page)
    if (to.name === 'search') await animeStore.fetchAnimeByTitle(to.params.query, to.params.page)

    next()

})

export default router
