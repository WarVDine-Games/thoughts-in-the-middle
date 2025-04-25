import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { Logger } from "./helpers/logger";
import { GameManager, JoinGameActionResponse } from "./managers/GameManager";
import { PlayerManager } from "./managers/PlayerManager";
import { thoughtTokenMapping } from "./models/ThoughtToken";

// PORT we will listen on
const PORT = process.env.PORT || 2019;
const logger = new Logger();
const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
    logger.info("GET /");
    res.status(200).json({ Hello: "World!" });
});

// Create serverInstance so we can connect via webSocket
const serverInstance = server.listen(PORT, () =>
    logger.info(`\n=== Listening on post ${PORT} ===\n`),
);

// Connect via webSocket
const io = new Server(serverInstance);
const gameManager = new GameManager();
const playerManager = new PlayerManager();

interface CreateRoomInput {
    name: string;
    uniqueClientId: string;
}

interface JoinRoomInput {
    name: string;
    roomCode: string;
    uniqueClientId: string;
}

io.on("connection", (socket) => {
    socket.on("createRoom", ({ uniqueClientId, name }: CreateRoomInput) => {
        // Check if the user is already connected
        let player = playerManager.findPlayerFromClientId(uniqueClientId);
        if (player) {
            player.name = name;
            player.socketId = socket.id;
        } else {
            player = playerManager.createPlayer(
                uniqueClientId,
                socket.id,
                name,
            );
        }

        const newGameRoom = gameManager.createGame(player);

        socket.join(newGameRoom.roomId);
        io.to(newGameRoom.roomId).emit("lobbyInfo", newGameRoom.lobbyInfo);
        io.to(newGameRoom.roomId).emit("gameInfo", newGameRoom.gameInfo);
        socket.emit("yourCards", player.cards);
    });

    socket.on(
        "joinRoom",
        ({ uniqueClientId, name, roomCode }: JoinRoomInput) => {
            const gameRoom = gameManager.findGame(roomCode);
            if (!gameRoom) {
                socket.emit("error", { message: "Game not found" });
                return;
            }

            // Check if the user is already connected
            let player = playerManager.findPlayerFromClientId(uniqueClientId);
            if (player) {
                player.name = name;
                player.socketId = socket.id;
            } else {
                player = playerManager.createPlayer(
                    uniqueClientId,
                    socket.id,
                    name,
                );
            }

            const joinGameResponse = gameManager.joinGame(player, roomCode);
            if (
                [
                    JoinGameActionResponse.GAME_NOT_FOUND,
                    JoinGameActionResponse.LOBBY_FULL,
                ].includes(joinGameResponse)
            ) {
                socket.emit("error", { message: joinGameResponse });
                return;
            }

            socket.join(roomCode);
            io.to(roomCode).emit("lobbyInfo", gameRoom.lobbyInfo);
            io.to(roomCode).emit("gameInfo", gameRoom.gameInfo);
            socket.emit("yourCards", player.cards);
        },
    );

    socket.on("startGame", ({ gameRoomId, uniqueClientId }) => {
        const gameRoom = gameManager.findGame(gameRoomId);
        if (!gameRoom) {
            socket.emit("error", { message: "Game not found" });
            return;
        }

        const player = playerManager.findPlayerFromClientId(uniqueClientId);
        if (!player) {
            socket.emit("error", { message: "Player not found" });
            return;
        }

        if (gameRoom.roomAdminPlayerId !== player.uniqueClientId) {
            socket.emit("error", { message: "You are not the admin" });
            return;
        }

        if (gameRoom.lobby.length < gameRoom.MIN_PLAYERS) {
            socket.emit("error", {
                message: `Not enough players to start the game. Minimum is ${gameRoom.MIN_PLAYERS}`,
            });
            return;
        }

        gameRoom.startGame();

        io.to(gameRoomId).emit("lobbyInfo", gameRoom.lobbyInfo);
        io.to(gameRoomId).emit("gameInfo", gameRoom.gameInfo);
        io.to(gameRoomId).emit("gameOver", null);
        gameRoom.lobby.forEach((player) => {
            io.to(player.socketId).emit("yourCards", player.cards);
        });
    });

    socket.on("selectCard", ({ uniqueClientId, card }) => {
        const player = playerManager.findPlayerFromClientId(uniqueClientId);
        if (!player) {
            socket.emit("error", { message: "Player not found" });
            return;
        }

        const gameRoom = gameManager.findGame(player.currentGameRoomId);
        if (!gameRoom) {
            socket.emit("error", { message: "Game not found" });
            return;
        }

        if (!gameRoom.currentPair) {
            socket.emit("error", { message: "Player pair not found" });
            return;
        }

        if (gameRoom.currentPair.playerIdThatShouldPlay !== uniqueClientId) {
            socket.emit("error", {
                message: "It's not your turn to play",
            });
            return;
        }
        if (!player.hasCard(card)) {
            socket.emit("error", { message: "You don't have this card" });
            return;
        }

        gameRoom.currentPair.playCardForPlayer(uniqueClientId, card);
        player.removeCard(card);
        const newCard = gameRoom.drawCard();
        if (newCard !== "") {
            player.addCard(newCard);
        }

        io.to(player.currentGameRoomId).emit("gameInfo", gameRoom.gameInfo);
        socket.emit("yourCards", player.cards);
    });

    socket.on(
        "giveThoughtToken",
        ({ uniqueClientId, thoughtTokenStrength }) => {
            const player = playerManager.findPlayerFromClientId(uniqueClientId);
            if (!player) {
                socket.emit("error", { message: "Player not found" });
                return;
            }
            const gameRoom = gameManager.findGame(player.currentGameRoomId);
            if (!gameRoom) {
                socket.emit("error", { message: "Game not found" });
                return;
            }

            if (thoughtTokenStrength >= 1) {
                gameRoom.currentPair.addThoughtToken(
                    thoughtTokenMapping[thoughtTokenStrength]!,
                );
            }
            gameRoom.currentPair.clearChosenCards();
            gameRoom.changeTurns();
            if (gameRoom.isGameOver) {
                io.to(player.currentGameRoomId).emit("gameOver", {
                    winningPair: gameRoom.winner.playerPairInfo,
                    totalScore: gameRoom.winner.totalThoughtTokenValues,
                });
                return;
            }

            io.to(player.currentGameRoomId).emit("gameInfo", gameRoom.gameInfo);
        },
    );
});

logger.info("server configuration complete");
