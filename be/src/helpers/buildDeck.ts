import { ALL_GROUPS } from "./mediumCardList";
import { WORDS } from "./randomWordsList";

export const CRYSTAL_BALL = "CRYSTAL_BALL";
const CRYSTAL_BALL_COUNT = 3;

const addCrystalBallCards = (deck: string[]): string[] => {
    // Put three crystal ball cards in random spots within the last third of the word list
    const start = Math.floor(deck.length * (2 / 3));
    for (let i = 0; i < CRYSTAL_BALL_COUNT; i++) {
        const end = deck.length - 1;
        const randomPosition = Math.floor(
            Math.random() * (end - start + 1) + start,
        );
        deck.splice(randomPosition, 0, CRYSTAL_BALL);
    }
    return deck;
};

const buildDeckWithRandomWords = (numberOfPlayers: number): string[] => {
    // One "set of cards" is 18 cards
    // We want to have n-1 sets of cards, where n is the number of players
    // Ex: if we have 2 players, we want 1 set of cards
    const totalCardCount = (numberOfPlayers - 1) * 18;

    //shuffle all words
    const shuffledWords = [...WORDS].sort(() => 0.5 - Math.random());
    // Build deck with the specified number of words
    const deck = shuffledWords.slice(0, totalCardCount);

    return addCrystalBallCards(deck);
};

const buildDeckWithMediumSets = (numberOfPlayers: number): string[] => {
    const shuffledGroups = ALL_GROUPS.sort(() => Math.random() - 0.5);
    const groupsToUse = shuffledGroups.slice(0, numberOfPlayers - 1);
    const deck = groupsToUse.reduce((acc, group) => {
        return acc.concat(group);
    }, []);

    deck.sort(() => Math.random() - 0.5);
    return addCrystalBallCards(deck);
};

export const buildDeck = (numberOfPlayers: number): string[] => {
    return buildDeckWithMediumSets(numberOfPlayers);
    // return buildDeckWithRandomWords(numberOfPlayers);
};
