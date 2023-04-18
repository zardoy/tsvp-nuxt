<script setup lang="ts">
const border = ref<HTMLDivElement>()
addEventListener('scroll', (e) => {
    const target = e.target as HTMLDivElement;
    console.log(target.scrollTop)
})
border.value?.style
</script>
<template>
    <div class="container">
        <div class="border" ref="border"></div>
    </div>
</template>
<style scoped lang="scss">
.container {
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    /* filter: blur(6px); */
    transform: scale(2);
}

.border {
    width: 600px;
    height: 600px;
    border: 60px;
    border-color: #007acc;
    border-style: solid;
    $outline-color: #08c2fd;
    box-shadow: 0 0 0 7px $outline-color, 0 0 20px 12px $outline-color, 0 0 0 7px $outline-color inset, 0 0 20px 12px $outline-color inset;
}
</style>
