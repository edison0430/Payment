<template>
    <div class="order" :class="{ 'order-active': show }">
        <h3 class="order__title">訂單資訊</h3>
        <div class="order__item">
            <span class="order__header">商品名稱 ：</span>
            <br>
            Iphone XR 手機殼 x1
        </div>
        <div class="order__number">
            <span class="order__header">訂單編號 ：</span>
            <br>
            17485739
        </div>
        <div class="order__money">
            <span class="order__header">訂單金額：</span>
            <br>
            NT$ 600
        </div>

        <div class="order__toggle" @click="show = !show">
            訂單資訊
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 訂單資訊在手機頁面中是否顯示
                show: false
            }
        }
    }
</script>

<style lang="scss">
    .order {
        @media (max-width: 768px) {
            position: absolute;
            top: 120px;
            left: -250px;
        }

        width: 250px;
        height: 290px;
        background-color: $color-grey-1;
        border-radius: 10px 0 0 10px;
        display: flex;
        flex-direction: column;
        padding: 25px 20px 35px 25px;
        justify-content: space-between;
        letter-spacing: 1.67px;
        z-index: 1;
        transition: left .5s;


        &__title {
            @media (max-width: 768px) {
                display: none;
            }

            font-size: 18px;
        }

        &__header {
            color: $color-grey-4;
        }

        &__toggle {
            @media (min-width: 768px) {
                display: none;
            }

            position: absolute;
            top: 0;
            right: -40px;
            width: 40px;
            height: 130px;
            padding: 20px 7px;
            letter-spacing: 4px;
            border: 1px solid $color-grey-2;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            writing-mode: vertical-lr;
            cursor: pointer;
            background-color: $color-grey-1;
        }

        &-active {
            left: 0;
        }
    }
</style>