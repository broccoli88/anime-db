<script setup></script>
<template>
    <div class="footer">
        <p>Made by <span>PJ</span></p>
    </div>
</template>

<style lang="scss" scoped>
.footer {
    display: block;
    padding-block: calc($p-lg * 3);
    margin-top: $m-lg;

    p {
        text-align: center;
        font-weight: 300;
        font-size: 1.4rem;

        span {
            color: $color-primary-light;
        }
    }
}
</style>
