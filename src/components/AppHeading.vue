<script setup></script>

<template>
    <section class="heading">
        <h1>
            <slot>Ranking</slot>
        </h1>
    </section>
</template>

<style lang="scss" scoped>
.heading {
    text-align: center;
    margin-block: $m-lg;

    @include breakpoint {
        text-align: left;
        margin-block: calc($m-lg * 2);
    }
}
</style>
