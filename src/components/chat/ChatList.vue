<script setup>
import ChatListItem from "./item/ChatListItem.vue";
import SearchIcon from "@/assets/icons/SearchIcon.vue";
import { getList } from "@/api/chat";
import { onMounted, ref } from "vue";

const chats = ref();

function list() {
	getList(
		({ data }) => {
			chats.value = data;
		},
		(error) => {
			console.log(error);
		}
	);
}

onMounted(() => {
	list();
});
</script>

<template>
	<div class="search-div">
		<input type="text" placeholder="Search in site" />
		<search-icon class="search-icon" />
	</div>
	<div class="wrap">
		<chat-list-item v-for="chat in chats" :key="chat.id" :chat="chat" />
	</div>
	<router-link :to="{ name: 'chat-creation' }">
		<div class="main-but regist-but">새로운 채팅 시작</div>
	</router-link>
</template>

<style scoped>
@import "@/assets/common/global.css";

.search-div {
	width: 15rem;
	padding: 0.5rem;
	border: 1px solid rgb(0, 0, 0, 0.1);
	border-radius: 0.5rem;
	margin-left: auto;
	margin-right: 1rem;
}

.search-icon {
	margin-top: 0.2rem;
}

.search-icon:hover {
	cursor: pointer;
	opacity: 90%;
}
input {
	width: 13rem;
	font-size: 1rem;
	border: none;
}

input:focus {
	outline: none;
}
.wrap {
	display: flex;
	flex-wrap: wrap;
	max-height: 30rem;
	overflow: scroll;
	margin-top: 2rem;
}

.regist-but {
	margin-top: 5rem;
}
</style>
