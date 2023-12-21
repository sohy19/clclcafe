<script setup></script>

<template>
	<div class="chat-wrap someone">
		<div class="chat-item">
			<div class="name">현제</div>
			<div class="content get">
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor
			</div>
		</div>
		<div class="time">11/26 00:00</div>
	</div>
</template>

<style scoped>
.chat-wrap {
	background-color: white;
	margin-bottom: 1.5rem;
}

.chat-item {
	display: inline-block;
	background-color: white;
	text-align: left;
}

.someone {
	text-align: left;
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

.content {
	max-width: 18rem;
	padding: 0.5rem;
	border-radius: 1rem;
}

.get {
	background-color: #e9deca;
	margin-right: 0.3rem;
}
</style>
