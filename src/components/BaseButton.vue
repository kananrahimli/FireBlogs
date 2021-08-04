<template>
    <button  @click="method">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props:['method']
}
</script>

<style lang="scss" scoped>
    button{
       text-decoration: none;
        color: white;
        font-size: 18px;
        padding: 6px 18px;
        background: black;
        align-self: center;
        border-radius: 50px;
        margin: 16px 0px;
    }
</style>