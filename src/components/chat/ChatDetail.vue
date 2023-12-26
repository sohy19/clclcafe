<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getDetail, getUser, joinChat } from "@/api/chat";
import ChatItem from "./item/ChatItem.vue";
import { socket } from "@/api/socket";

const route = useRoute();
const { chatId } = route.params;

// ************ 채팅 정보 ************
const chatInfo = ref({
	id: 0,
	name: "",
	description: "",
	madeBy: "",
	maxCapacity: 0,
});

const getChatInfo = () => {
	getDetail(
		chatId,
		(response) => {
			let { data } = response;
			chatInfo.value.id = data.id;
			chatInfo.value.name = data.name;
			chatInfo.value.description = data.description;
			chatInfo.value.madeBy = data.madeBy;
			chatInfo.value.maxCapacity = data.maxCapacity;
		},
		(error) => {
			console.log(error);
		}
	);
};

// ************ 유저 정보 ************
const users = ref([]);
const show = ref(false);

const isShow = () => {
	show.value = !show.value;
	if (show.value) {
		getUsers();
	}
};

const getUsers = () => {
	getUser(
		chatId,
		(response) => {
			let { data } = response;
			users.value = data.joinedMembers;
			console.log(data.joinedMembers);
		},
		(error) => {
			console.log(error);
		}
	);
};

// ************ 채팅 ************
const timestamp = ref(null);
const messages = ref([]);
const joinedMembers = ref("");

const getChat = () => {
	joinChat(
		chatId,
		(response) => {
			let { data } = response;
			if (data.lastEvaluatedKey) {
				timestamp.value = data.lastEvaluatedKey.timestamp;
			} else {
				timestamp.value = null;
			}
			joinedMembers.value = data.joinedMembers[0];
			data.oldmessages.reverse().forEach((msg) => {
				messages.value.push(msg);
			});
			// 소켓 연결
			socket(chatId, messages.value);
			console.log(data);
		},
		(error) => {
			console.log(error);
			// 400 채팅방 꽉 참
		}
	);
};

onMounted(() => {
	getChatInfo();
	getChat();
});
</script>

<template>
	<div class="info">
		<div class="info-div">
			<div class="chatTitle">
				<div class="title">방제목</div>
				<span>{{ chatInfo.name }}</span>
			</div>
			<div class="info-item">
				<div class="title">방장</div>
				<span>{{ chatInfo.madeBy }}</span>
			</div>
		</div>
		<div class="attendance" @click="isShow">
			<div class="attendance-title">접속한 분들 ▼</div>
			<div v-if="show" class="attendance-item" v-for="user in users">
				{{ user }}
			</div>
		</div>
	</div>
	<div class="border chat">
		<div class="chats">
			<div class="chat-wrap">
				<div class="enter">{{ joinedMembers }} 님이 들어오셨어요.</div>
			</div>
			<template v-for="msg in messages">
				<chat-item :msg="msg" />
			</template>
		</div>
		<div class="send-div">
			<textarea class="border" type="text"></textarea>
			<span class="send-but">전송</span>
		</div>
	</div>
</template>

<style scoped>
@import "@/assets/common/global.css";

.info {
	/* border: 1px solid red; */
	width: 30rem;
	margin: 0 auto;
	padding-bottom: 1rem;
}
.info-div {
	/* border: 1px solid blue; */
	margin-right: 18rem;
	width: 30rem;
	text-align: left;
	padding: 0 1rem;
}

.title {
	background-color: #e9deca;
	width: 3rem;
	padding: 0.5rem 1rem;
	border-radius: 2rem;
	display: inline-block;
	text-align: center;
}

span {
	font-family: "SOYOMapleBoldTTF";
	margin-left: 0.5rem;
}

.info-item {
	margin-top: 0.5rem;
}

.attendance {
	background-color: #afbdca;
	padding: 0.7rem 1rem;
	border-radius: 2rem;
	display: inline-block;
	font-size: 0.9rem;
	position: absolute;
	z-index: 1;
	margin-top: 3rem;
	top: 57vh;
	right: 34vw;
	text-align: left;
}

.attendance-item {
	/* padding: 0.3rem 0; */
	margin-top: 0.5rem;
	font-family: "SOYOMapleBoldTTF";
}

.attendance-title:hover {
	cursor: pointer;
}

.attendance div {
	background-color: #afbdca;
}

.chat {
	width: 28rem;
	height: 40rem;
	margin: 0 auto;
	/* padding: 1rem; */
}

.chats {
	background-color: white;
	height: 37rem;
	overflow: scroll;
	padding: 1rem;
	border-radius: 1rem 1rem 0 0;
}

.send-div {
	background-color: white;
	display: flex;
	justify-content: space-between;
	border-radius: 0 0 1rem 1rem;
	padding: 1rem;
	height: 3.5rem;
}

.send-div textarea {
	background-color: #e9deca;
	width: 25rem;
	padding: 1rem;
	resize: none;
	font-size: 1rem;
}

.send-div textarea:focus {
	outline: none;
}

.send-but {
	background-color: #e9deca;
	padding: 1rem;
	border-radius: 1rem;
	width: 2.5rem;
}

.send-but:hover {
	cursor: pointer;
}

.enter {
	background-color: white;
	padding: 0.5rem;
	/* width: 15rem; */
	margin: 0 auto;
	font-size: 0.85rem;
	color: gray;
}
</style>
