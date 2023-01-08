<template>
    <div class="big_dipper">
        <div class="star star_1"></div>
        <div class="star star_2"></div>
        <div class="star star_3"></div>
        <div class="star star_4"></div>
        <div class="star star_5"></div>
        <div class="star star_6"></div>
        <div class="star star_7"></div>
    </div>
</template>

<script>
export default {
    name: "BigDipper",
    data() {
        return {
        };
    },
    mounted() {
        // this.$router.replace({name: 'NeteaseCloadPlayer'})
    }
};
</script>

<style lang="scss" scoped>
.big_dipper {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: black;
    background-image: url('~@/assets/BigDipper.jfif');
    background-repeat: no-repeat;
    background-size: 100%  100%;
    background-position: center center;
    z-index: 9999;
}

.star {
    z-index: 10000;
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 100px;
    background-color: white;
    transform: translate(-50%, -50%);
    // opacity: 0.2;
    box-sizing: border-box;
    box-shadow: 0 0 10px 5px #ccc;
}

.star_1 {
    left: 13.9%;
    top: 38.1%;
    width: 65px;
    height: 65px;
}

.star_2 {
    left: 31.2%;
    top: 34.5%;
    width: 63px;
    height: 63px;
}

.star_3 {
    left: 41.2%;
    top: 41.3%;
    width: 65px;
    height: 65px;
}

.star_4 {
    left: 54.1%;
    top: 49.0%;
    width: 40px;
    height: 40px;
}

.star_5 {
    left: 57.0%;
    top: 64.1%;
    width: 50px;
    height: 50px;
}

.star_6 {
    left: 77.9%;
    top: 65.0%;
    width: 55px;
    height: 55px;
}

.star_7 {
    left: 81.2%;
    top: 46.5%;
    width: 65px;
    height: 65px;
}
</style>
