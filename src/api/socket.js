function decodeUnicode(str) {
	return decodeURIComponent(str.split("\\u").join("%u"));
}

export function socket(chatId, messages, scrollToBottom) {
	const handlers = {
		ws: null,
		retry: 0,
		connect(ws_url, msg) {
			this.ws = new WebSocket(ws_url || this.ws?.url);

			this.ws.onopen = this.onopen.bind(this);
			this.ws.onclose = this.onclose.bind(this);
			this.ws.onerror = this.onerror.bind(this);
			// this.ws.send = this.onsend.bind(this);
			this.ws.onmessage = this.onmessage.bind(this);
		},
		reconnect() {
			this.connect();
		},
		onopen() {
			console.log("웹소켓 서버와 접속");
			this.retry = 0;
		},
		onclose(event) {
			if (!event.wasClean) {
				console.error("웹소켓 서버가 죽거나 네트워크 장애입니다.");

				if (this.retry < 3) {
					this.retry += 1;
					setTimeout(() => {
						this.reconnect();
						console.log(`[${this.retry}] 접속 재시도 ...`);
					}, 1000 * this.retry);
				} else {
					alert("웹소켓 서버에 접속할 수 없습니다. 사이트 홈으로 이동합니다.");
					window.location.href = "/";
				}
			}
		},
		onerror() {
			console.error("웹소켓 에러가 발생했습니다.");
		},
		onsend(message) {
			console.log("send : ", message);
			this.ws.send(JSON.stringify(message));
		},
		onmessage(event) {
			const message_json = event.data;
			console.log("웹소켓 텍스트 메세지 수신 :", message_json);

			const { type, userId, message, userNickname, chatTime } =
				JSON.parse(message_json);

			switch (type) {
				case "chat.user.join": // 유저가 접속했을 때
					console.log("메시지타입 :", type);
					console.log("유저 접속!", decodeUnicode(userNickname));
					messages.push({
						message: "memberEnter",
						userNickname: decodeUnicode(userNickname),
					});
					break;
				case "chat.message": // 유저가 메시지를 보낼 때
					console.log("메시지타입 :", type);
					messages.push({
						userId: userId,
						userNickname: decodeUnicode(userNickname),
						message: decodeUnicode(message),
						chatTime: chatTime,
					});
					scrollToBottom();
					break;
				case "chat.user.leave": // 유저가 나갔을 때
					console.log("메시지타입 :", type);
					break;
				default:
					console.error(`Invalid message type : ${type}`);
			}
		},
	};

	const { VITE_VUE_SOCKET_URL } = import.meta.env;
	const ws_scheme = window.location.protocol === "https:" ? "wss" : "ws";
	const ws_url = `${ws_scheme}://${VITE_VUE_SOCKET_URL}/ws/chat/${chatId}/?token=${sessionStorage.getItem(
		"accessToken"
	)}`;

	ws: handlers.connect(ws_url);

	return handlers;
}
