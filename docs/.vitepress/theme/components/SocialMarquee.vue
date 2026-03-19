<script setup>
const props = defineProps({
    items: {
        type: Array,
        default: () => []
    },
    duration: {
        type: Number,
        default: 20
    }
})

// 复制一份实现无限循环
const list = [...props.items, ...props.items]
</script>

<template>
    <div class="scroll-gallery">
        <div class="image-track" :style="{ animationDuration: duration + 's' }">
            <div v-for="(item, index) in list" :key="index" class="item" :data-platform="item.platform">
                <a :href="item.link" target="_blank">
                    <img :src="item.img" :alt="item.title" />
                    <div class="caption">
                        {{ item.title }}
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.scroll-gallery {
    overflow: hidden;
    white-space: nowrap;
}

.image-track {
    display: inline-flex;
    animation: scroll-left linear infinite;
}

.scroll-gallery:hover .image-track {
    animation-play-state: paused;
}

.item {
    display: inline-block;
    text-align: center;
    margin: 0 15px;
    border-radius: 25px;
    padding: 10px;
    width: 120px;
    /* 固定外框宽 */
}

img {
    width: 100%;
    height: 220px;
    /* 固定外框高 */
    object-fit: contain;
    /* 关键：自适应 */
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.1);
    /* 可选：防止透明图难看 */
}

.caption {
    margin-top: 8px;
    font-size: 16px;
    font-weight: bold;
    color: white;
}

@keyframes scroll-left {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}

/* 平台颜色 */

.item[data-platform="github"] {
    background: linear-gradient(45deg, #24292e, #404448);
}

.item[data-platform="gitee"] {
    background: linear-gradient(45deg, #c71d23, #fc575e);
}

.item[data-platform="xianyu"] {
    background: linear-gradient(45deg, #FF8C00, #FFA500);
}

.item[data-platform="miniprogram"] {
    background: linear-gradient(45deg, #07c160, #10d673);
}

.item[data-platform="xiaohongshu"] {
    background: linear-gradient(45deg, #fe2c55, #ff4d6d);
}

.item[data-platform="csdn"] {
    background: linear-gradient(45deg, #c71d23, #fc575e);
}
</style>