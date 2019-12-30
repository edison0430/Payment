<template>
    <div class="steps">
        <span class="step" :class="{ 'step__active': isActive('step1')}">1</span>
        <span class="step__line" :class="stepLineClass('step1')"></span>
        <span class="step" :class="{ 'step__active': isActive('step2')}">2</span>
        <span class="step__line" :class="stepLineClass('step2')"></span>
        <span class="step"  :class="{ 'step__active': isActive('step3')}">3</span>
    </div>
</template>

<script>
    export default {
        methods: {
            isActive(route) {
                if (this.$route.name >= route) {
                    return true;
                } else {
                    return false;
                }
            },
            stepLineClass(route) {
                let classObject = {};
                if (this.$route.name > route) {
                    classObject['step__line--done'] = true;
                } else if (this.$route.name === route){
                    classObject['step__line--active'] = true;
                }

                return classObject;
            }
        }
    }
</script>

<style lang="scss">

    .steps {
        display: flex;
        height: 150px;
        justify-content: center;
        align-items: center;
    }

    .step {
        width: 40px;
        height: 40px;
        background-color: $color-grey-2;
        border-radius: 50%;
        font-size: 20px;
        color: #ffffff;
        
        display: flex;
        justify-content: center;
        align-items: center;

        &__active {
            background-color: $color-green-2;

        }
    }

    .step__line {
        height: 3px;
        width: 120px;
        background-color: $color-grey-2;

        &--active {
            background: linear-gradient(to right, $color-green-2, $color-grey-2);
        }

        &--done {
            background-color: $color-green-2;
            
        }
    }

</style>