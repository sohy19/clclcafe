<script setup>
import VNavbar from "@/components/layout/VNavbar.vue";
import CloudIcon from "./assets/icon/CloudIcon.vue";
import CloudIconVue from "./assets/icon/CloudIcon.vue";
</script>

<template>
	<div id="wrap">
		<v-navbar />
		<cloud-icon />
		<router-view />
	</div>
</template>

<style>
* {
	background-color: #f6efe7;
}
</style>

<style scoped>
#wrap {
	margin: -0.5rem 15rem;
	text-align: center;
	min-height: 90vh;
	padding-bottom: 10rem;
}

.cloud-icon {
}

.all-margin {
}
</style>
