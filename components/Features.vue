<script setup lang="ts">
import CogIcon from 'vue-material-design-icons/Cog.vue';
import StarIcon from 'vue-material-design-icons/Star.vue';
import CompassIcon from 'vue-material-design-icons/CompassOutline.vue';
import VueMarkdown from 'vue-markdown-render'

const runtimeConfig = useRuntimeConfig()
const pluginConfigProps = JSON.parse(runtimeConfig.public.configuration).properties
</script>
<template>
    <div class="flex-col">
        <div class="m-8 min-h-[1000px]">
            <h2 class="text-6xl">Featuring</h2>
            <div class="flex flex-col text-2xl m-4">
                <div class="flex">
                    <CogIcon :size="30" /> <span class="ml-2">70+ Settings <span class="text-gray-400"> - not only allows to
                            configure every aspect of the plugin itself, but also allows to configure built-in TypeScript
                            features as well</span></span>
                </div>
                <div class="flex">
                    <StarIcon :size="30" /> <span class="ml-2">50+ Unique features</span>
                </div>
                <div class="flex">
                    <CompassIcon :size="30" /> <span class="ml-2">Only 20% of cool features are enabled out of the
                        box</span>
                </div>
            </div>
            <h2 class="text-6xl mt-10">Recommended features</h2>
            <div class="text-xl mt-2">
                Some of new features are not enabled out of the box to ensure we don't ruin existing behavior & workflows.
                But it's super recommended to try them out!
            </div>
            <table class="mt-4">
                <thead>
                    <tr>
                        <th>Recommended VS Code JSON setting</th>
                        <th>Extra note</th>
                    </tr>
                </thead>
                <template
                    v-for="[key, { recommended, description }] in Object.entries(pluginConfigProps) as [string, any][]">
                    <tr v-if="recommended !== undefined" :key="key" class="py-4">
                        <td>
                            <code>"tsEssentialsPlugins.{{ key }}": {{ recommended === '' ? 'true' : `"${recommended}"` }}</code>
                        </td>
                        <td>
                            <VueMarkdown v-if="description" :source="description" />
                            <span v-else class="text-gray-500 italic">(No extra note)</span>
                        </td>
                    </tr>
                </template>
            </table>
        </div>
    </div>
</template>
<style scoped lang="scss">
h2 {
    margin-bottom: 20px;
}

.material-design-icon {
    color: rgb(255, 255, 255, 0.6);
}

code {
    font-size: 0.75em;
}

table,
td,
th {
    border-collapse: collapse;
    border: 1px solid gray;
}

td {
    padding: 5px;
}
</style>
