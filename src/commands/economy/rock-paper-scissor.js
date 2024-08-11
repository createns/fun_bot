const { SlashCommandBuilder } = require('discord.js');
const { RockPaperScissors } = require('discord-gamecord');

module.exports = {
    data: {
        name: 'rock-paper-scissors',
        description: 'Play rock paper scissor game with a user!',
        

    },

    /*new SlashCommandBuilder()
        .setName('rock-paper-scissors')
        .setDescription('Play a rock paper scissors game with an user!')
        .addUserOption(option => option.setName('opponent').setDescription('The person to play against').setRequired(true)),*/

    run: async ({ interaction }) => {

        const { options } = interaction;
        const opponent = options.getUser('opponent');

        const Game = new RockPaperScissors({
            message: interaction,
            isSlashGame: true,
            opponent: opponent,
            embed: {
                title: 'Rock Paper Scissors',
                color: '#5865F2',
                description: 'Press a button below to make a choice'
            },
            buttons: {
                rock: 'Rock',
                paper: 'Paper',
                scissors: 'Scissors'
            },
            emojis: {
                rock: '🪨',
                paper: '📰',
                scissors: '✂️'
            },
            mentionUser: true,
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            pickMessage: 'You choose {emoji}.',
            winMessage: '**{player} won the Game! Congratulations!🎉**',
            tieMessage: 'Oh, the Game tied! Wanna play again?',
            timeoutMessage: 'The Game was unfinished! No one won the Game!',
            playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
        });

        Game.startGame();
        
    }
}