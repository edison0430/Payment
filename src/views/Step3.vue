<template>
    <div class="step-finish">
        <div class="payment" v-if="cvs">
            <h5 class="header">
                您的訂單已成立！
            </h5>
            <div class="payment__info">
                <p class="payment__label">付款超商：</p>
                <p class="payment__content">{{ cvs }}</p>
                <p class="payment__label">付款代碼：</p>
                <p class="payment__content">{{ randomID() }}</p>
                <p class="payment__label">付款期限：</p>
                <p class="payment__content">{{ paymentLimit() }}</p>
                <p class="payment__label">＊ 請至您選擇之超商店內機台輸入代碼進行繳費，逾期訂單將自動作廢。</p>

            </div>
        </div>
        <div class="payment" v-else>
            <h5 class="header">
                您的訂單已完成付款！
            </h5>
            <div class="step-finish__img animated bounceIn">
                <svg class="step-finish__img--svg">
                    <use xlink:href="#finish"></use>
                </svg>
            </div>
            <p>稍後將寄送訂單詳細資訊至您的 E-mail</p>
        </div>
        <div class="link-area" style="justifyContent: center">
            <router-link to="/" tag="button" class="link-area__button">
                返回首頁
            </router-link>
        </div>

    </div>
</template>

<script>
    export default {
        props: ['cvs'],
        methods: {
            randomID() {
                return Math.random().toString(36).substring(2).toUpperCase(); 
            },
            paymentLimit() {
                let result = new Date();
                result.setDate(result.getDate() + 2);
                return result.toLocaleDateString() + ' 23:59:59';
            }
        }
    }
</script>

<style lang="scss">

.step-finish {
    &__img {
        width: 146px;
        height: 146px;
        margin: 80px 0 60px 0;
        background-color: $color-green-4;
        border-radius: 50%;

        &--svg {
            width: 160px;
            height: 160px;
            fill: $color-black;
        }
    }
}

.payment {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
    width: 100%;

    &__info {
        display: flex;
        flex-direction: column;
        padding: 60px 80px;
        width: 100%;
    }

    &__label {
        letter-spacing: 1.46px;
    }

    &__content {
        font-size: 24px;
        letter-spacing: 2.51px;
        margin-bottom: 35px;
    }
}


</style>