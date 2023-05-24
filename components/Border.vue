<script setup lang="ts">
const mainContentAreaThreshold = 1000

const border = ref<HTMLDivElement>()
const outerContainer = ref<HTMLDivElement>()
const initialScreenContainer = ref<HTMLDivElement>()
const scrollDownHint = ref<HTMLDivElement>()
// const featuringContainer = ref<HTMLDivElement>()

const featuresRef = ref()

const updateBorder = () => {
    const scrollY = document.documentElement.scrollTop
    border.value!.style.filter = `blur(${Math.min(5, (600 - scrollY) / 300)}px)`
    const maxScale = 4.4
    const newScale = Math.min(Math.max(1, (scrollY + 250) / 300), maxScale);
    outerContainer.value!.style.transform /* = featuringContainer.value!.style.transform */ = `scale(${newScale}) translateZ(0)`
    const maxScaleReached = newScale === maxScale;
    // outerContainer.value!.style.position = maxScaleReached ? 'sticky' : ''
    scrollDownHint.value!.style.opacity = scrollY < 80 ? '1' : '0'

    const initialContentVisible = scrollY < mainContentAreaThreshold
    // const mainContentStatic = scrollY > mainContentAreaThreshold
    const featuringVisibleThreashold = mainContentAreaThreshold - 700;
    const featuringVisible = scrollY > featuringVisibleThreashold
    const featuresEl = featuresRef.value?.$el
    if (featuresEl) {
        featuresEl.style.opacity = !initialContentVisible ? '1' : '0'
        featuresEl.style.pointerEvents = !initialContentVisible ? '' : 'none'
    }

    initialScreenContainer.value!.style.opacity = initialContentVisible ? '1' : '0'
    initialScreenContainer.value!.style.pointerEvents = initialContentVisible ? '' : 'none'
    outerContainer.value!.style.display = scrollY < mainContentAreaThreshold + 100 ? '' : 'none'

    // featuringContainer.value!.style.pointerEvents = featuringVisible ? '' : 'none'

    // mainContentStatic = maxScaleReached
    // if (mainContentStatic && /* !featuringContainer.value!.style.top */) {
    //     const topClient = featuringContainer.value!.children[0]!.getBoundingClientRect().top;
    //     featuringContainer.value!.style.top = `${scrollY + topClient + 25}px`
    //     displayY = scrollY
    // } else if (!mainContentStatic) {
    //     featuringContainer.value!.style.top = ''
    //     displayY = null
    // }
    // featuringContainer.value!.style.position = mainContentStatic ? 'static' : ''
    // featuringContainer.value!.style.bottom = mainContentStatic ? 'unset' : ''
}

onMounted(() => {
    document.addEventListener('scroll', updateBorder, { passive: true, })
    updateBorder()
})

</script>
<template>
    <div ref="outerContainer" class="main-outer-container">
        <div ref="initialScreenContainer" class="main-container">
            <div>
                <div class="border-container">
                    <h1 class="title">TS</h1>
                    <div ref="border" class="border" />
                </div>
                <div class="h-0">
                    <div class="flex justify-center space-x-2 pt-5">
                        <a class="button bg-blue-500"
                            href="https://marketplace.visualstudio.com/items?itemName=zardoy.ts-essential-plugins">Install</a>
                        <a class="button bg-slate-300 text-black"
                            href="https://github.com/zardoy/typjescript-vscode-plugins">GitHub</a>
                    </div>
                    <div ref="scrollDownHint" class="scroll-down-container">
                        <div class="arrows-down">
                            <div />
                            <div />
                            <div />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="featuring" ref="featuringContainer">
        <h1>Featuring</h1>
    </div> -->
    <Features ref="featuresRef" class="mt-[2000px]" />
</template>
<style scoped lang="scss">
$border-width: 50px;

.main-outer-container {
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    will-change: contents;
}

.main-container {
    position: relative;
    transition: opacity 0.2s;
}

@keyframes blink {

    0%,
    50%,
    100% {
        opacity: 0.5;
    }

    25% {
        opacity: 0.2;
    }
}

.title {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    margin: 60px 80px;
    white-space: nowrap;
    font-size: 180px;
    line-height: 180px;
    font-weight: bold;
    color: #54a1e7;
}

.scroll-down-container {
    /* position: absolute; */
    padding-top: 5px;
    flex-direction: column;
    margin: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    transition: opacity 0.5s;
    margin-bottom: $border-width + 30px;
    pointer-events: none;


    span {
        color: lightslategray;
        margin-bottom: -5px;
    }

    .arrows-down {

        div {
            $size: 18px;
            width: $size;
            height: $size;
            border: 2px solid white;
            border-top: none;
            border-left: none;
            transform: rotate(45deg) scale(1.8);
            /* animation: blink 1.5s linear 0 infinite normal both; */
            animation-name: blink;
            animation-duration: 6s;
            animation-iteration-count: infinite;
            animation-fill-mode: both;
        }

        div:nth-child(2) {
            animation-delay: 0.25s;
        }

        div:nth-child(3) {
            animation-delay: 0.5s;
        }
    }
}

.border-container {
    width: 600px;
    height: 600px;
    position: relative;
}

.border {
    position: absolute;
    width: 100%;
    height: 100%;
    border: $border-width;
    border-color: #007acc;
    border-style: solid;
    $outline-color: #08c2fd;
    border-radius: 1px;
    box-shadow: 0 0 0 7px $outline-color, 0 0 20px 12px $outline-color, 0 0 0 7px $outline-color inset, 0 0 20px 12px $outline-color inset;
}

.feature-hint {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 35px;
    color: gray;

    &.icon {
        color: rgba(255, 255, 255, 0.1);
    }
}

.featuring {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    height: calc(100vh - 75px);
}

.button {
    font-size: 1.1rem;
    border-radius: 0.25rem;
    padding-left: 22px;
    padding-right: 22px;
    padding-top: 10px;
    padding-bottom: 10px;
}
</style>
