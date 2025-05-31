export async function checkExistingPlayer(members: any[], friends: any[]) {
    const filteredData = [];
    for (const friend of friends) {
        const isAlreadyMember = members?.some(member => member?.id === friend?.friend._id);
        if (!isAlreadyMember) {
            filteredData.push(friend);
        }
    }

    return filteredData;
}
