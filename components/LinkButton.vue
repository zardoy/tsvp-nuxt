<script setup lang="ts">
const { color } = defineProps<{
    color: string
    hoverColor: string
    href: string
}>()
</script>
<template>
    <a class="button" :href="href" :style="`--color: ${color};`">
        <slot />
    </a>
</template>
<style scoped lang="scss">
.button {
    color: white;
    font-size: 1.1rem;
    border-radius: 0.25rem;
    border: 3px solid var(--color);
    box-shadow: 0 0 4px var(--color);
    background: transparent;
    /* padding: 10px 22px; */
    padding: 10px 30px;
    transition: background 0.2s;

    &:hover {
        background: rgba(30, 143, 255, 0.3);
    }
}
</style>
