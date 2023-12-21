<script setup></script>

<template>
	<div class="chat-wrap me">
		<div class="time">11/26 00:00</div>
		<div class="chat-item">
			<div class="content send">"Lorem ipsum dolor sit amet,</div>
		</div>
	</div>
</template>

<style scoped>
.chat-wrap {
	background-color: white;
	margin-bottom: 1.5rem;
}

.time {
	background-color: white;
	display: inline-block;
	font-size: 0.8rem;
}

.chat-item {
	display: inline-block;
	background-color: white;
	text-align: left;
}

.me {
	text-align: right;
}

.content {
	max-width: 18rem;
	padding: 0.5rem;
	border-radius: 1rem;
}

.send {
	background-color: #7996b4;
	margin-left: 0.3rem;
}
</style>
