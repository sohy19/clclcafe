<script setup>
import ChatListItem from "./item/ChatListItem.vue";
import SearchIcon from "@/assets/icons/SearchIcon.vue";

const data = [
	{
		id: 1,
		name: "자유롭게",
		description: "자유롭게 떠들어보자",
		madeBy: "방가방가",
		maxCapacity: 1,
		headcount: 1,
	},
	{
		id: 2,
		name: "쿠버네티스에 대해서 이야기 나눠요",
		description:
			"초보자, 중급자 자유롭게초보자, 중급자 자유롭게초보자, 중급자 자유롭게초보자, 중급자 자유롭게",
		madeBy: "방가방가",
		maxCapacity: 3,
		headcount: 1,
	},
	{
		id: 3,
		name: "쿠버네티스에 대해서 이야기 나눠요",
		description: "초보자, 중급자 자유롭게",
		madeBy: "방가방가",
		maxCapacity: 3,
		headcount: 3,
	},
	{
		id: 4,
		name: "쿠버네티스에 대해서 이야기 나눠요",
		description: "초보자, 중급자 자유롭게",
		madeBy: "방가방가",
		maxCapacity: 3,
		headcount: 1,
	},
	{
		id: 5,
		name: "쿠버네티스에 대해서 이야기 나눠요",
		description: "초보자, 중급자 자유롭게",
		madeBy: "방가방가",
		maxCapacity: 3,
		headcount: 1,
	},
	{
		id: 6,
		name: "쿠버네티스에 대해서 이야기 나눠요",
		description: "초보자, 중급자 자유롭게",
		madeBy: "방가방가",
		maxCapacity: 3,
		headcount: 1,
	},
	{
		id: 7,
		name: "쿠버네티스에 대해서 이야기 나눠요",
		description: "초보자, 중급자 자유롭게",
		madeBy: "방가방가",
		maxCapacity: 3,
		headcount: 1,
	},
	{
		id: 8,
		name: "쿠버네티스에 대해서 이야기 나눠요",
		description: "초보자, 중급자 자유롭게",
		madeBy: "방가방가",
		maxCapacity: 3,
		headcount: 1,
	},
];
</script>

<template>
	<div class="search-div">
		<input type="text" placeholder="Search in site" />
		<search-icon class="search-icon" />
	</div>
	<div class="wrap">
		<chat-list-item v-for="chat in data" :key="chat.id" :chat="chat" />
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
	height: 30rem;
	overflow: scroll;
	margin-top: 2rem;
}

.regist-but {
	margin-top: 5rem;
}
</style>
