const API_GATEWAY = "http://192.168.1.6:7000";

const Config = {
    PORT: 5050,
    SCORING_PORT: 5009,
    HOST: "127.0.0.1",
    SCORING_HOST: "127.0.0.1",
    API_GATEWAY,
    USER_SOCKET_PORT: 6002,
    ENDPOINTS: {
        AUTH: "/auth",
        USER: "/user",
        TOURNAMENT: "/tournament",
        PRODUCT: "/product",
        SCORING: "/scoring",
        TEAM: "/team",
        VENUE: "/venue",
        NOTIFICATION: "/notifications",
    },
};

export default Config;
