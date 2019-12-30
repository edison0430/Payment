<template>
    <div class="">
        <h5 class="header">
            STEP2. 填寫付款資訊
        </h5>
        <h6 class="mini-header">
            {{ payType.chineseName }}
        </h6>
        <ValidationObserver v-slot="{ handleSubmit }" class="payInfo">
            <form class="payInfo" id="payInfo" @submit.prevent="handleSubmit(onSubmit)">
                <template v-if="payType.name === 'creditCard' || payType.name === 'unionPay'">
                    <div class="payInfo__intallment">
                        <ValidationProvider rules="select" name="付款方式" v-slot="{ errors,classes }">
                            <div class="control" :class="classes">
                                <input type="radio" id="installment1" value="no" v-model="isInstallment"
                                    class="payInfo__radio-input">
                                <label for="installment1" class="payInfo__label">
                                    <span class="payInfo__radio-button"></span>
                                    一次付款
                                </label>
                                <input type="radio" id="installment2" value="yes" v-model="isInstallment"
                                    class="payInfo__radio-input">
                                <label for="installment2" class="payInfo__label">
                                    <span class="payInfo__radio-button"></span>
                                    分期付款
                                </label>
                                <p>{{errors[0]}}</p>

                            </div>
                        </ValidationProvider>
                    </div>
                    <div class="payInfo__card">
                        <p class="payInfo__label">信用卡號：</p>
                        <div class="payInfo__card--wrapper" style="flex: 0 0 100%">
                            <input type="input" id="creditCard1" class="payInfo__card--number" maxlength="4"
                                autocomplete="off" v-model="number1"
                                @keyup="changeFocus($event.target.value.length === 4)">
                            —
                            <input type="input" id="creditCard2" class="payInfo__card--number" maxlength="4"
                                autocomplete="off" v-model="number2"
                                @keyup="changeFocus($event.target.value.length === 4)">
                            —
                            <input type="input" id="creditCard3" class="payInfo__card--number" maxlength="4"
                                autocomplete="off" v-model="number3"
                                @keyup="changeFocus($event.target.value.length === 4)">
                            —
                            <input type="input" id="creditCard4" class="payInfo__card--number" maxlength="4"
                                autocomplete="off" v-model="number4"
                                @keyup="changeFocus($event.target.value.length === 4)">
                            <!-- 信用卡卡號規則
                                Visa Card	第一碼為 4。
                                Master Card	第一碼為 5，且前二碼介於 51 和 55 中間。
                                JCB Card	第一碼為 1，且前四碼為 1800。
                                            第一碼為 2，且前四碼為 2131。
                                            第一碼為 3，且前三碼介於 300和399之間。

                                為方便顯展示功能，目前僅先判斷第一碼。
                             -->
                            <svg class="payInfo__card--img" :class="{ 'payInfo__card--active': cardNumber[0] === '4'}">
                                <use xlink:href="#visa"></use>
                            </svg>
                            <svg class="payInfo__card--img" :class="{ 'payInfo__card--active': cardNumber[0] === '5'}">
                                <use xlink:href="#mastercard"></use>
                            </svg>
                            <svg class="payInfo__card--img"
                                :class="{ 'payInfo__card--active': cardNumber[0] >= '1' && cardNumber[0] <= '3'}">
                                <use xlink:href="#jcb"></use>
                            </svg>
                        </div>
                        <ValidationProvider rules="required|digits:16" name="卡號" v-slot="{ errors,classes }">
                            <div class="control" :class="classes">
                                <input type="text" v-model="cardNumber" style="display:none">
                                <p>{{ errors[0] }}</p>
                            </div>
                        </ValidationProvider>

                    </div>
                    <div class="payInfo__card-date">
                        <p class="payInfo__label">有效月年：</p>
                        <ValidationProvider rules="select" name="月" v-slot="{ errors,classes }">
                            <div class="control" :class="classes">
                                <select v-model="cardMonth" class="payInfo__select"
                                    :class="{ 'payInfo__select--disabled': cardMonth === '' }">
                                    <option disabled value="">選擇：</option>
                                    <option v-for="n in 12" :key="n">{{ n | addZero }}</option>
                                </select>
                                <p>{{ errors[0] }}</p>
                            </div>
                        </ValidationProvider>
                        /
                        <ValidationProvider rules="select" name="年" v-slot="{ errors,classes }">
                            <div class="control" :class="classes">
                                <select v-model="cardYear" class="payInfo__select"
                                    :class="{ 'payInfo__select--disabled': cardYear === '' }">
                                    <option disabled value="">選擇：</option>
                                    <option v-for="n in 12" :key="n">{{ n | year }}</option>
                                </select>
                                <p>{{ errors[0] }}</p>
                            </div>
                        </ValidationProvider>
                        年
                    </div>
                    <div class="payInfo__card-security-code">
                        <p class="payInfo__label">背面末三碼</p>
                        <ValidationProvider rules="required|digits:3" name="安全碼" v-slot="{ errors,classes }">
                            <div class="control" :class="classes">
                                <input v-model="cvc" type="text" class="payInfo__card--number-long" maxlength="3"
                                    id="cvc" autocomplete="off">
                                <svg class="payInfo__card--img">
                                    <use xlink:href="#backThree"></use>
                                </svg>
                                <p>{{ errors[0] }}</p>
                            </div>
                        </ValidationProvider>

                    </div>
                </template>

                <!-- shop -->
                <template v-else-if="payType.name === 'shop'">
                    <div class="cvs__selection">
                        <p class="payInfo__label">付款超商：</p>
                        <ValidationProvider rules="select" name="超商" v-slot="{ errors,classes }">
                            <div class="control" :class="classes">
                                <select v-model="cvs" class="payInfo__select"
                                    :class="{ 'payInfo__select--disabled': cvs === '' }">
                                    <option disabled value="">選擇：</option>
                                    <option>全家便利商店</option>
                                    <option>統一超商</option>
                                    <option>OK 超商</option>
                                    <option>萊爾富便利商店</option>
                                </select>
                                <p>{{ errors[0] }}</p>
                            </div>
                        </ValidationProvider>
                    </div>
                </template>

                <!-- WebATM -->
                <template v-if="payType.name === 'webAtm' || payType.name === 'atm'">
                    <div class="bank__selection">
                        <p class="payInfo__label">付款銀行：</p>
                        <ValidationProvider rules="select" name="付款銀行" v-slot="{ errors,classes }">
                            <div class="control" :class="classes">
                                <select v-model="bank" class="payInfo__select-long"
                                    :class="{ 'payInfo__select--disabled': bank === '' }">
                                    <option disabled value="">選擇：</option>
                                    <option>台灣銀行</option>
                                    <option>中國信託商業銀行</option>
                                    <option>玉山商業銀行</option>
                                    <option>元大商業銀行</option>
                                </select>
                                <p>{{ errors[0] }}</p>
                            </div>
                        </ValidationProvider>
                    </div>
                    <div class="bank__readme">
                        <ol class="bank__readme--list">
                            <li class="bank__readme--item">請準備晶片金融卡 + 晶片讀卡機，我們將引導您至指定金融機構之網路 ATM 進行交易手續。</li>
                            <li class="bank__readme--item">持對應機構之金融卡可享免跨行轉帳手續費，若無以上金融機構發行之金融卡，可自由選擇其一金融機構進行後續交易流程。</li>
                        </ol>
                    </div>
                </template>
                <div class="payInfo__email">
                    <p class="payInfo__label">填寫付款人信箱：</p>
                    <ValidationProvider rules="required|email" name="Email" v-slot="{ errors,classes }">
                        <div class="control" :class="classes">
                            <input v-model="email" type="email" class="payInfo__email--input">
                            <p>{{ errors[0] }}</p>
                        </div>
                    </ValidationProvider>
                </div>
                <div class="payInfo__check">
                    <ValidationProvider :rules="{ check: { allowFalse: false } }" name="訂單確認"
                        v-slot="{ errors,classes }" class="payInfo__check--wrapper">
                        <input type="checkbox" id="cc" v-model="checked">
                        <div class="wrapper">
                            <label for="cc">
                                請再次確認「訂單資訊」與「付款資訊」，付款完成後將發送通知信至您的 E-mail 信箱
                            </label>
                            <a href="#" class="payInfo__link">第三方支付金流平台服條款</a>
                            <p style="color:red; minHeight:20px; lineHeight:20px; margin: 10px 0 20px -20px;">
                                {{ errors[0] }}</p>
                        </div>
                    </ValidationProvider>
                </div>

                <div class="link-area">
                    <router-link to="/checkout/step1" tag="button" class="link-area__button link-area__button--previous">
                        上一步
                    </router-link>
                    <button type="submit" class="link-area__button">下一步</button>
                </div>
            </form>
        </ValidationObserver>


    </div>
</template>

<script>
    import {
        ValidationProvider,
        ValidationObserver,
        extend
    } from 'vee-validate';
    import {
        required,
        email,
        digits
    } from 'vee-validate/dist/rules';

    extend('min', {
        validate(value, args) {
            return value.length >= args.length;
        },
        params: ['length'],
        message: '{_field_} 必須為 {length} 碼'
    })
    
    extend('email', {
        ...email,
        message: '{_field_}格式錯誤'
    });

    extend('required', {
        ...required,
        message: '{_field_}不得為空'
    });

    extend('select', {
        ...required,
        message: '請選擇{_field_}'
    });

    extend('check', {
        ...required,
        message: '請勾選{_field_}'
    });

    extend('digits', {
        ...digits,
        message: '{_field_} 必須為 {length} 碼數字'
    });

    export default {
        props: ['payType'],
        data() {
            return {
                isInstallment: null,
                number1: '',
                number2: '',
                number3: '',
                number4: '',
                cardMonth: '',
                cardYear: '',
                checked: false,
                cvs: '',
                bank: '',
                cvc: '',
                email: ''
            }
        },
        methods: {
            onSubmit() {
                this.$router.push({
                    name: 'step3',
                    params: {
                        cvs: this.cvs
                    }
                })
            },
            changeFocus(value) {
                if (value) {
                    document.activeElement.nextElementSibling.focus()
                }
            }
        },
        computed: {
            cardNumber() {
                return this.number1 + this.number2 + this.number3 + this.number4;
            }
        },
        filters: {
            addZero(value) {
                if (value < 10) {
                    return `0${value}`
                } else {
                    return value;
                }
            },
            year(value) {
                let currentYear = new Date().getFullYear();
                return (currentYear + value);
            }
        },
        components: {
            ValidationProvider,
            ValidationObserver
        }
    }
</script>

<style lang="scss">
    .payInfo__check--wrapper {
        display: flex;
        width: 100%;
        flex: 1;
        align-items: baseline;

        input {
            margin-right: 10px;
            display: block;
            border: none;
            min-width: 0;
            width: 15px;
            height: 15px;
        }
    }

    .wrapper {
        display: flex;
        flex-direction: column;
    }

    .payInfo {
        width: 100%;
        flex: 1;

        &__label {
            font-size: 14px;
            margin-right: 30px;
            margin-bottom: 10px;
            letter-spacing: 1.46px;
            flex: 0 0 100%;
        }

        &__radio-input {
            display: none;
        }

        &__radio-button {
            height: 18px;
            width: 18px;
            border: 2px solid $color-grey-6;
            border-radius: 50%;
            display: inline-block;
            transform: translateY(3px);
            margin-right: 5px;

            &::after {
                content: "";
                display: block;
                height: 10px;
                width: 10px;
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: $color-green-6;
                opacity: 0;
                transition: all .2s;
            }
        }

        &__radio-input:checked + &__label &__radio-button::after {
            opacity: 1;
        }

        &__select {
            @include select(93px);

            &-long {
                @include select(160px);
            }
        }

        &__card {
            display: flex;
            flex-direction: column;

            &--number {
                @include input(65px);
            }

            &--number-long {
                @include input(100px);
            }

            &--img {
                height: 40px;
                width: 50px;
                fill: $color-grey-7;
                vertical-align: top;
            }

            &--active {
                fill: $color-green-3;
            }
        }

        &__card-date {
            display: flex;
            flex-wrap: wrap;

            & span:first-of-type select {
                margin-left: 0;
            }
        }

        &__email {
            display: flex;
            flex-wrap: wrap;
        }

        &__email--input {
            @include input(240px);
        }

        &__check {
            display: flex;
            align-items: baseline;

            &--checkbox {
                margin-right: 10px;
            }
        }

        &__link {
            display: block;
            color: $color-grey-6;
            margin-top: 10px;
            letter-spacing: 1.46px;
        }
    }

    .cvs__selection,
    .bank__selection {
        & span:first-of-type select {
            margin-left: 0;
        }
    }

    .bank__readme {
        &--list {
            margin-left: 20px;
        }

        &--item {
            font-size: 14px;
            letter-spacing: 1.46px;
            line-height: 25px;
            margin-bottom: 10px;
        }
    }

    .control {

        p {
            margin: 5px 0 15px 0;
            min-height: 14px;
            line-height: 14px;
        }

        & > span {
            display: block;
        }

        &.invalid input,
        p {
            color: #EB0600;
        }
    }
</style>