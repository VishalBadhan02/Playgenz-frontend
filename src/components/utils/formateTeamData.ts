export const formateTeamData = (data: any) => {
    const teamData = {
        _id: data.id,
        teamName: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        openPositions: data.openPositions,
        noOfPlayers: data.noOfPlayers,
        addressOfGround: data.location,
        description: data.description
    }

    return teamData;
}