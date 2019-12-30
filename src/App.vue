<template>
    <div id="app">
        <div class="container">
            <div class="drawer">
                <Order/>
            </div>
            <div class="left-panel">
                <Order/>
                <button class="left-panel__button--back-to-shop">返回商店</button>
            </div>
            <div class="right-panel">
                <Steps/>
                <router-view class="info"/>
            </div>
        </div>
        <footer class="footer"></footer>
    </div>
</template>

<script>
import Steps from './components/Steps.vue';
import Order from './components/Order.vue';

export default {
    data() {
        return {
        }
    },
    methods: {
    },
    components: {
        Steps,
        Order,
    }
}
</script>

<style lang="scss">
    @import "@/styles/_base.scss";
    @import url('https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap&subset=chinese-traditional');

    .container {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
    }

    .drawer {
        @media (min-width: 768px) {
            display: none;
        }
    }

    .left-panel {
        @media (max-width: 768px){
            display: none;
        }

        margin-top: 150px;
        display: flex;
        flex-basis: 200px;
        flex-direction: column;

        &__button--back-to-shop {
            width: 90px;
            flex-basis: 40px;
            margin-top: 30px;
            background-color: $color-black;
            border-radius: 5px;
            color: white;
            font-size: 14px;
        }
    }

    .right-panel {
        @media (max-width:1100px) {
            width: 100%;
        }

        width: 50%;
        display: flex;
        flex-direction: column;
    }


    .info {
        flex: 1;
        box-shadow: 0 2px 13px 0 rgba(0, 0, 0, 0.08);
        border-radius: 10px;
        background-color: white;;
        overflow-y: auto;

        padding: 40px 65px;
        display: flex;
        flex-direction: column;
        align-items: center;

        @media (max-width: 690px) {
            padding: 40px 40px;
        }

    }
</style>