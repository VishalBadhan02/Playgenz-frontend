import Config from "@/Config/config";

interface Message {
    type: string;
    matchId?: string;
    data?: any;
    sequenceNumber?: number;
    timestamp?: string;
    updatedBy?: string;
    token?: any;
}

interface ErrorData {
    type: string;
    message: string;
}

interface ScoreData {
    [key: string]: any;
}

interface MessageData {
    [key: string]: any;
}

type ConnectionType = "general" | "chat";

class WebSocketManager {
    matchId: string;
    authToken: string | null;
    connectionType: ConnectionType;
    ws: WebSocket | null;
    messageQueue: Message[];
    pendingUpdates: Map<number, Message>;
    reconnectAttempts: number;
    maxReconnectAttempts: number;
    currentUser: string;
    currentTime: Date;
    isConnected: boolean;
    messageStatuses: Map<string, string>;
    onStatusChange: ((status: string) => void) | null;
    subscribeToUpdates: ((data: any) => void) | null;
    onError: ((error: ErrorData) => void) | null;
    lastSequenceNumber: number;

    constructor(matchId: string, connectionType: ConnectionType = "general") {
        this.matchId = matchId;
        this.authToken = localStorage.getItem("token");
        this.connectionType = connectionType;
        this.ws = null;
        this.messageQueue = [];
        this.pendingUpdates = new Map();
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.currentUser = matchId;
        this.currentTime = new Date();

        this.isConnected = false;
        this.messageStatuses = new Map();

        this.onStatusChange = null;
        this.subscribeToUpdates = null;
        this.onError = null;
        this.lastSequenceNumber = 0;
    }

    connect(): void {
        try {
            this.ws = new WebSocket(
                `ws://${Config.SCORING_HOST}:${Config.USER_SOCKET_PORT}`,
                this.authToken ? [this.authToken] : []
            );
            this.setupWebSocketHandlers();
            this.updateStatus("connecting");

            document.addEventListener("visibilitychange", this.handleVisibilityChange);

            // if (this.connectionType === "chat") {
            //     this.initializeChatConnection("online");
            // }
        } catch (error) {
            console.log("sdn jk")
            this.handleError("CONNECTION_ERROR", error as Error);
        }
    }

    handleVisibilityChange = (): void => {
        if (this.connectionType === "chat") {
            const status = document.visibilityState === "visible" ? "online" : "offline";
            // this.initializeChatConnection(status);
        }
    };

    // initializeChatConnection(type: string): number | undefined {
    //     return this.queueMessage({
    //         type: "user/init",
    //         matchId: this.matchId,
    //         data: {
    //             statusType: type,
    //             connectionType: "chat",
    //             timestamp: this.currentTime.toISOString(),
    //         },
    //     });
    // }

    updateStatus(status: string): void {
        if (this.onStatusChange) {
            this.onStatusChange(status);
        }
    }

    setupWebSocketHandlers(): void {
        if (!this.ws) return;

        this.ws.onopen = () => {
            this.updateStatus("connected");
            this.reconnectAttempts = 0;
            this.processQueuedMessages();
        };

        this.ws.onmessage = (event: MessageEvent) => {
            try {
                const data = JSON.parse(event.data);
                this.handleIncomingMessage(data);
            } catch (error) {
                console.log("sdn jk")
                this.handleError("MESSAGE_PARSE_ERROR", error as Error);
            }
        };

        this.ws.onclose = () => {
            this.updateStatus("disconnected");
            this.handleReconnect();
        };

        this.ws.onerror = (error: Event) => {
            this.handleError("WEBSOCKET_ERROR", error as any);
        };
    }

    queueMessage(message: Message): number {
        // console.log(message)
        const enhancedMessage: Message = {
            ...message,
            sequenceNumber: ++this.lastSequenceNumber,
            timestamp: this.currentTime.toISOString(),
            updatedBy: this.currentUser,
        };

        this.messageQueue.push(enhancedMessage);
        this.processQueuedMessages();
        return this.lastSequenceNumber;
    }

    processQueuedMessages(): void {
        while (
            this.messageQueue.length > 0 &&
            this.ws &&
            this.ws.readyState === WebSocket.OPEN
        ) {
            const message = this.messageQueue[0];

            try {
                this.sendMessage(message);
                this.pendingUpdates.set(message.sequenceNumber!, message);
                this.messageQueue.shift();
            } catch (error) {
                console.log("sdn jk")
                console.error("Error sending message:", error);
                break;
            }
        }
    }

    sendMessage(data: Message): boolean {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(data));
            return true;
        }
        return false;
    }

    handleIncomingMessage(data: any): void {
        switch (data.type) {
            case "AUTH_SUCCESS":
                this.updateStatus("authenticated");
                break;
            case "AUTH_ERROR":
                this.handleError("AUTH_ERROR", data);
                break;
            case "UPDATE_ACK":
                this.handleUpdateAcknowledgement(data);
                break;
            case "score_update_request":
                this.subscribeToUpdates?.(data);
                break;
            case "BOOKING_CONFIRMED":
                this.subscribeToUpdates?.(data);
                window.dispatchEvent(new CustomEvent("bookingConfirmed", { detail: data }));
                break;
            case "BOOKING_ERROR":
                this.subscribeToUpdates?.(data);
                window.dispatchEvent(new CustomEvent("bookingError", { detail: data }));
                break;
            case "LOCK_CONFIRMED":
            case "MAKING_PAYMENT":
                console.log("Processing booking/lock response:", data);
                break;
            case "message_update":
                if (!this.isDuplicateMessage(data)) {
                    this.messageStatuses.set(data.messageId, data.status);
                    this.subscribeToUpdates?.(data);
                }
                break;
            default:
                this.subscribeToUpdates?.(data);
        }
    }

    handleUpdateAcknowledgement(data: any): void {
        // Handle update acknowledgement logic
    }

    isDuplicateMessage(data: any): boolean {
        return false; // Implement your duplicate detection logic
    }

    handleReconnect(): void {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            setTimeout(() => this.connect(), 5000);
        }
    }

    handleError(type: string, error: Error): void {
        if (this.onError) {
            this.onError({ type, message: error.message || "An error occurred" });
        }
    }

    sendScoreUpdate(scoreData: ScoreData, route: string): number {
        return this.queueMessage({
            type: route,
            matchId: this.matchId,
            data: {
                ...scoreData,
                timestamp: this.currentTime.toISOString(),
                updatedBy: this.currentUser,
            },
        });
    }

    handelMessageUpdate(messageData: MessageData): number {
        return this.queueMessage({
            type: "user/chat",
            matchId: this.matchId,
            data: {
                ...messageData,
                timestamp: this.currentTime.toISOString(),
                updatedBy: this.currentUser,
            },
        });
    }

    handelVenueBooking(messageData: MessageData): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
                reject(new Error("WebSocket is not connected"));
                return;
            }

            const sequenceNumber = this.queueMessage({
                type:
                    messageData.type === "cancel"
                        ? "venue/cancellation"
                        : "venue/booking",
                matchId: this.matchId,
                data: messageData.data || messageData,
                timestamp: this.currentTime.toISOString(),
                updatedBy: this.currentUser,
            });

            const handleResponse = (event: MessageEvent) => {
                try {
                    const response = JSON.parse(event.data);

                    if (
                        ["BOOKING_CONFIRMED", "LOCK_CONFIRMED", "MAKING_PAYMENT", "BOOKING_CANCELLED"].includes(response.type)
                    ) {
                        this.ws?.removeEventListener("message", handleResponse);
                        resolve(response);
                    } else if (
                        ["BOOKING_ERROR", "LOCK_ERROR", "CANCEL_ERROR"].includes(response.type)
                    ) {
                        this.ws?.removeEventListener("message", handleResponse);
                        reject(new Error(response.message));
                    }
                } catch (error) {
                    console.log("sdn jk")
                    this.ws?.removeEventListener("message", handleResponse);
                    reject(error);
                }
            };

            this.ws.addEventListener("message", handleResponse);

            setTimeout(() => {
                this.ws?.removeEventListener("message", handleResponse);
                reject(new Error("Request timed out"));
            }, 10000);
        });
    }

    disconnect(): void {
        if (this.ws) {
            // this.initializeChatConnection("offline");
            document.removeEventListener("visibilitychange", this.handleVisibilityChange);
            this.isConnected = false;
        }
    }
}

export default WebSocketManager;