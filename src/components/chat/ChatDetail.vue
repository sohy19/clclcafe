<script setup>
import { onMounted, ref, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getDetail, getUser, joinChat, moreChat } from "@/api/chat";
import ChatItem from "./item/ChatItem.vue";
import { socket } from "@/api/socket";
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";

const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);

const route = useRoute();
const router = useRouter();
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
const joinedMembers = ref([]);
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
			joinedMembers.value = data.joinedMembers;
			console.log(data.joinedMembers);
		},
		(error) => {
			console.log(error);
		}
	);
};

// ************ 채팅 ************
const messages = ref([]);
const joinMember = ref();
const handlers = ref(null);
const timestamp = ref(null);
const chatContainer = ref(null);

const scrollToBottom = () => {
	nextTick(() => {
		chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
	});
};
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
			// joinMember.value = data.joinedMembers[0];
			joinedMembers.value = data.joinedMembers;
			data.oldMessages.reverse().forEach((msg) => {
				messages.value.push(msg);
			});
			// 소켓 연결
			handlers.value = socket(
				chatId,
				messages.value,
				joinedMembers.value,
				scrollToBottom
			);
			console.log(data);
		},
		(error) => {
			// 400 채팅방 꽉 참
			alert("이런! 채팅방이 꽉 차버렸어요. 조금만 기다려 주시겠어요?");
			router.replace({
				name: "chat",
			});
			console.log(error);
		}
	);
};

const msg = ref({
	type: "chat.message",
	message: "",
	userNickname: userInfo.value.nickname,
	userId: userInfo.value.id,
});

const writeChat = () => {
	// console.log("wirteChat : ", msg.value);
	handlers.value.onsend(msg.value);
	msg.value.message = "";
};

const getMoreChat = () => {
	console.log("get chat!");
	moreChat(
		chatId,
		timestamp.value,
		(response) => {
			let { data } = response;
			if (data.lastEvaluatedKey) {
				timestamp.value = data.lastEvaluatedKey.timestamp;
			} else {
				timestamp.value = null;
			}

			data.oldMessages.forEach((msg) => {
				messages.value.unshift(msg);
			});
			console.log("moremchat", data);
		},
		(error) => {
			console.log(error);
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
			<div v-if="show" class="attendance-item" v-for="member in joinedMembers">
				{{ member }}
			</div>
		</div>
	</div>
	<div class="border chat">
		<div class="chats" ref="chatContainer">
			<div class="chat-wrap">
				<div>
					<div v-if="timestamp" @click="getMoreChat">채팅 더보기</div>
				</div>
				<div class="enter">
					{{ joinedMembers[joinedMembers.length - 1] }} 님이 들어오셨어요.
				</div>
			</div>
			<template v-for="msg in messages">
				<chat-item :msg="msg" />
			</template>
		</div>
		<div class="send-div">
			<textarea
				class="border"
				type="text"
				v-model="msg.message"
				@keydown.enter.prevent="writeChat"
			></textarea>
			<span class="send-but" @click="writeChat">전송</span>
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
	top: 28rem;

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
	overflow: auto;
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
