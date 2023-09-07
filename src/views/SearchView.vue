<script setup>
import AppToOverViewBtn from '../components/AppToOverViewBtn.vue'
import AppHeading from '../components/AppHeading.vue'
import AppCard from '../components/AppCard.vue'
import { useAnimeStore } from '../stores/useAnimeStore'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const animeStore = useAnimeStore(),
    { animeList, isSpinnerVisible, checkIfAnimeListRender } = storeToRefs(animeStore),
    route = useRoute()

const showNoResults = computed(
    () => !isSpinnerVisible.value && animeList.value && animeList.value.length === 0
)
</script>

<template>
    <section class="anime-search">
        <div>
            <AppToOverViewBtn />
            <AppHeading>
                Searched title:
                <span class="searched-title">
                    {{ route.params.query }}
                </span>
            </AppHeading>
            <section class="anime-search-list" v-if="checkIfAnimeListRender">
                <AppCard v-for="anime in animeList" :key="anime._id" :anime-data="anime" />
            </section>

            <section v-if="showNoResults" class="no-search-results">
                <h2>
                    No search results for keyword:
                    <span class="searched-title">
                        {{ route.params.query }}
                    </span>
                </h2>
            </section>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.anime-search {
    display: grid;
    gap: $g-lg;
    margin-block: $m-block;
}

.anime-search-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(25rem, 100%), 32.5rem));
    justify-content: space-between;
    gap: $g-lg;
}

.searched-title {
    color: $color-primary;
}

.no-search-results {
    align-self: center;
    text-align: center;
    margin-top: 20rem;
}
</style>
