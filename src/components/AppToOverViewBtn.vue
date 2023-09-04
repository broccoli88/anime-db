<script setup></script>

<template>
    <RouterLink :to="{ name: 'home' }" class="back-btn">
        <AppIcon icon="solar:backspace-broken" class="back-btn__icon" />
        <p>To overview</p>
    </RouterLink>
</template>

<style lang="scss" scoped>
.back-btn {
    border: none;
    background: none;
    width: max-content;
    display: flex;
    align-items: center;
    gap: $g-sm;
    color: $fc-txt;
    cursor: pointer;

    &:hover,
    &:focus {
        color: $color-primary-light;

        .back-btn__icon {
            stroke: $color-primary-light;
        }
    }
}

.back-btn p,
.back-btn__icon {
    transition: $tr-03;
}
</style>
