import { createRouter, createWebHistory } from 'vue-router'
import { useAnimeStore } from '../stores/useAnimeStore'
import { useFetchById } from '../api/useFetchById'
import { useFetchByGenre } from '../api/useFetchByGenre'
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
        { selectedAnime, animeByGenreList, currentPage } = storeToRefs(animeStore)

    if (to.name === 'home') animeStore.clearSearchInput()
    if (to.name === 'details') selectedAnime.value = await useFetchById(to.params.id)
    if (to.name === 'genre') animeByGenreList.value = await useFetchByGenre(to.params.genre, currentPage.value)
    next()

})

export default router
