<script setup>
import { ref } from "vue";

const chatInfo = {
	id: 1,
	name: "자유롭게",
	description: "자유롭게 떠들어보자",
	madeBy: "방가방가",
	maxCapacity: 3,
};

const users = ["소현", "희관", "현제"];

const show = ref(false);

const isShow = () => {
	show.value = !show.value;
};
</script>

<template>
	<div class="info">
		<div class="info-div">
			<div>
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
			<div class="chat-wrap someone">
				<div class="chat-item">
					<div class="name">현제</div>
					<div class="content get">
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor
					</div>
				</div>
				<div class="time">11/26 00:00</div>
			</div>
			<div class="chat-wrap someone">
				<div class="chat-item">
					<div class="name">현제</div>
					<div class="content get">
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor
					</div>
				</div>
				<div class="time">11/26 00:00</div>
			</div>
			<div class="chat-wrap someone">
				<div class="chat-item">
					<div class="name">현제</div>
					<div class="content get">
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor
					</div>
				</div>
				<div class="time">11/26 00:00</div>
			</div>
			<div class="chat-wrap someone">
				<div class="chat-item">
					<div class="name">현제</div>
					<div class="content get">
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor
					</div>
				</div>
				<div class="time">11/26 00:00</div>
			</div>
			<div class="chat-wrap someone">
				<div class="chat-item">
					<div class="name">현제</div>
					<div class="content get">
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor
					</div>
				</div>
				<div class="time">11/26 00:00</div>
			</div>
			<div class="chat-wrap someone">
				<div class="chat-item">
					<div class="name">현제</div>
					<div class="content get">
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor
					</div>
				</div>
				<div class="time">11/26 00:00</div>
			</div>
			<div class="chat-wrap someone">
				<div class="chat-item">
					<div class="name">현제</div>
					<div class="content get">
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor
					</div>
				</div>
				<div class="time">11/26 00:00</div>
			</div>
			<div class="chat-wrap someone">
				<div class="chat-item">
					<div class="name">현제</div>
					<div class="content get">
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor
					</div>
				</div>
				<div class="time">11/26 00:00</div>
			</div>
			<div class="chat-wrap someone">
				<div class="chat-item">
					<div class="name">현제</div>
					<div class="content get">
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor
					</div>
				</div>
				<div class="time">11/26 00:00</div>
			</div>
			<div class="chat-wrap someone">
				<div class="chat-item">
					<div class="name">현제</div>
					<div class="content get">
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor
					</div>
				</div>
				<div class="time">11/26 00:00</div>
			</div>
			<div class="chat-wrap someone">
				<div class="chat-item">
					<div class="name">현제</div>
					<div class="content get">
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor
					</div>
				</div>
				<div class="time">11/26 00:00</div>
			</div>
			<div class="chat-wrap me">
				<div class="time">11/26 00:00</div>
				<div class="chat-item">
					<div class="content send">"Lorem ipsum dolor sit amet,</div>
				</div>
			</div>
			<div class="chat-wrap">
				<div class="border enter">
					“방가방가방가방가방가” 님이 들어오셨어요.
				</div>
			</div>
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
	display: inline-block;
}

.title {
	background-color: #e9deca;
	width: 3rem;
	padding: 0.5rem 1rem;
	border-radius: 2rem;
	display: inline-block;
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
	right: 35vw;
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

.content {
	max-width: 18rem;
	padding: 0.5rem;
	border-radius: 1rem;
}

.get {
	background-color: #e9deca;
	margin-right: 0.3rem;
}

.send {
	background-color: #7996b4;
	margin-left: 0.3rem;
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

.chat-item {
	display: inline-block;
	background-color: white;
	text-align: left;
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
.name {
	font-family: "SOYOMapleBoldTTF";
	background-color: white;
}

.time {
	background-color: white;
	display: inline-block;
	font-size: 0.8rem;
}

.chat-wrap {
	background-color: white;
	margin-bottom: 1.5rem;
}

.someone {
	text-align: left;
}

.me {
	text-align: right;
}

.enter {
	/* background-color: #afbdca; */
	padding: 0.5rem;
	/* width: 15rem; */
	margin: 0 auto;
	font-size: 0.85rem;
	color: gray;
}
</style>
