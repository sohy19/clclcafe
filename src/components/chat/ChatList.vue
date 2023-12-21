<script setup>
import ChatListItem from "./item/ChatListItem.vue";
import SearchIcon from "@/assets/icons/SearchIcon.vue";
import { getList } from "@/api/chat";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";

const memberStore = useMemberStore();
const { isLogin } = storeToRefs(memberStore);
const chats = ref();
const router = useRouter();

const goCreationPage = () => {
	if (isLogin.value) {
		router.push({ name: "chat-creation" });
	} else {
		alert("로그인이 필요해요!");
		router.push({ name: "user-login" });
	}
};

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
	<!-- <router-link :to="{ name: 'chat-creation' }"> -->
	<div class="main-but regist-but" @click="goCreationPage">
		새로운 채팅 시작
	</div>
	<!-- </router-link> -->
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
	overflow-y: auto;
	margin-top: 2rem;
}

.regist-but {
	margin-top: 5rem;
}
</style>
