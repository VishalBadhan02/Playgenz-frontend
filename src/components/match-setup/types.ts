export interface Step1TossWinnerProps {
    tossWinner: 'home' | 'away'; // The team that won the toss
    setTossWinner: (value: 'home' | 'away') => void; // Function to update the toss winner
    homeTeam: { name: string }; // Object representing the home team
    awayTeam: { name: string }; // Object representing the away team
    goToNextStep: () => void; // Function to proceed to the next step
}

export interface Step2TossDecision {
    tossWinner: 'home' | 'away'; // The team that won the toss
    setTossChoice: (value: 'bat' | 'bowl') => void; // Function to update the toss winner
    homeTeam: { name: string }; // Object representing the home team
    awayTeam: { name: string }; // Object representing the away team
    goToNextStep: () => void; // Function to proceed to the next step
    tossChoice: any,
    goToPreviousStep: (number: any) => void;
}

export interface Step3TossDecision {
    tossWinner: 'home' | 'away'; // The team that won the toss
    setTossChoice: (value: 'bat' | 'bowl') => void; // Function to update the toss winner
    homeTeam: { name: string }; // Object representing the home team
    awayTeam: { name: string }; // Object representing the away team
    goToNextStep: () => void; // Function to proceed to the next step
    tossChoice: any,
    goToPreviousStep: (number: any) => void;
    getBattingTeamPlayers: any;
    selectedStriker: any;
    setSelectedStriker: () => void;
    setSelectedNonStriker: () => void;
    selectedNonStriker: any;
}

export interface Step4TossDecision {
    tossWinner: 'home' | 'away'; // The team that won the toss
    setTossChoice: (value: 'bat' | 'bowl') => void; // Function to update the toss winner
    homeTeam: { name: string }; // Object representing the home team
    awayTeam: { name: string }; // Object representing the away team
    goToNextStep: () => void; // Function to proceed to the next step
    tossChoice: any,
    goToPreviousStep: (number: any) => void;
    getBowlingTeamPlayers: any;
    selectedBowler: any;
    setSelectedBowler: any;
    setSelectedNonStriker: () => void;
    selectedNonStriker: any;
    setTossWinner: (value: 'home' | 'away') => void;
    finalizeSetup: (value: any) => any;
    bowlingTeamPlayers: any
}