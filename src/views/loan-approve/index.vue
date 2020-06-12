<template>
    <div>
        <transition name="fadee" mode="out-in">
            <router-view />
        </transition>
    </div>
</template>
<style lang="scss">
    .fadee-enter{
        opacity: 0;
    }
    .fadee-enter-active{
        transition: opacity 1s;
    }
    .fadee-leave{
        opacity: 1;
    }
    .fadee-leave-active{
        transition: opacity 1s;
    }
</style>