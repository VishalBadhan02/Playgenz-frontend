export const titlePicker = (type) => {
    const title =
        type === "user"
            ? "Friend Request"
            : type === "team"
                ? "Team Invitation"
                : type === "tournament"
                    ? "Tournament Update"
                    : "New Achievement";
    return title;
};

export const typePicker = (type) => {
    const title =
        type === "user"
            ? "friend"
            : type === "team"
                ? "friend"
                : type === "tournament"
                    ? "Tournament Update"
                    : "New Achievement";
    return title;
};