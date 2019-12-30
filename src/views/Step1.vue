<template>
    <div class="">
        <h5 class="header">
            STEP1. 選擇付款方式
        </h5>
        <div class="paytype">
            <el-tooltip content="頁面將跳轉至對應之金融機構頁面進行後續交易" placement="top"  v-for="(type,index) in typeList" :key="index" open-delay.number="100" transition="">
                <div class="paytype__item" :class="{ 'paytype__item--active': selectedType === index }" 
                    @click="selectedType = index">
                    <svg class="paytype__item--img">
                        <use :xlink:href="'#' + type.name"></use>
                    </svg>
                    <h6 class="paytype__item--header">{{type.chineseName }}</h6>
                </div>
            </el-tooltip>
        </div>
        <div class="link-area">
            <!-- span 僅為排板用途 -->
            <span></span> 
            <router-link :to="{ name: 'step2', params: { payType: typeList[selectedType] }}" class="link-area__button" tag="button">
                下一步
            </router-link>
        </div>
    </div>
</template>

<script>
    // import _temp from '../../ValidatationRule'
    // temp();
    export default {
        data() {
            return {
                selectedType: 0,
                typeList: [{
                        name: 'creditCard',
                        chineseName: '信用卡/金融卡'
                    },
                    {
                        name: 'unionPay',
                        chineseName: '銀聯卡'
                    },
                    {
                        name: 'shop',
                        chineseName: '超商付款'
                    },
                    {
                        name: 'webAtm',
                        chineseName: 'Web ATM'
                    },
                    {
                        name: 'atm',
                        chineseName: 'ATM 轉帳'
                    }
                ]
            }
        },
        computed: {
            isSelected() {
                if (this.payType) {
                    return true;
                }
                return false;
            }
        }
    }
</script>

<style lang="scss">
    .header {
        width: 220px;
        text-align: center;
        font-size: 20px;
        letter-spacing: 2px;
        background: linear-gradient(0deg, $color-green-4, white 60%);
    }

    .mini-header {
        margin: 10px;
        letter-spacing: 1.25px;
    }

    .paytype {
        padding: 40px 0;
        flex-basis: 60%;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: flex-start;

        &__item {
            width: 161px;
            height: 139px;
            background-color: $color-grey-5;
            margin-right: 25px;
            margin-bottom: 35px;
            flex-wrap: wrap;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-radius: 5px;

            &--active {
                background-color: $color-green-3;
                cursor: pointer;

                &>h6 {
                    color: white;
                }

                &>svg {
                    fill: white;
                }
            }

            &--img {
                width: 80px;
                height: 60px;
                margin-bottom: 10px;
                fill: $color-black;
            }

            &--header {
                font-size: 14px;
                letter-spacing: 1.46px;
            }

            &:hover {
                background-color: $color-green-3;
                cursor: pointer;
            }

            &:hover &--header {
                color: white;
            }

            &:hover &--img {
                fill: white;
            }

        }
    }

    .link-area {
        display: flex;
        width: 100%;
        justify-content: space-between;
        
        &__button {
            width: 89px;
            height: 40px;
            border-radius: 5px;
            background-color: $color-green-3;
            color: #ffffff;
            font-size: 14px;
            letter-spacing: 1.46px;
            cursor: pointer;

            &--previous {
                color: $color-grey-4;
                background-color: $color-green-5;
            }
        }
    }
</style>