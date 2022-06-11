const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'localhost',
  port: 29000,
  username: 'bot',
  hideErrors: true,
  plugins: [
    require('mineflayer-collectblock').plugin
  ]
})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

bot.once('spawn', async () => {
    console.log('spawned!')
    bot.chat(`/teleport ${getRandomInt(1000, 5000)} ${getRandomInt(1000, 5000)} ${getRandomInt(1000, 5000)}`)
    await bot.waitForChunksToLoad()
    bot.emit('ready')
})

bot.once('ready', () => {
    console.log('ready')
})

bot._client.on('tags', data => {
    bot.registry.tags = unpackTagsObject(data.tags)
})

bot._client.on('declare_recipes', data => {
    bot.registry.recipes = unpackRecipesObject(data.recipes)
})

function unpackTagsObject(arr) {
    const obj = []
    for (const {tagType, tags} of arr) {
        obj[tagType] = {}
        for (const {tagName, entries} of tags) {
            obj[tagType][tagName] = entries
        }
    }
    return obj
}

function unpackRecipesObject(arr) {
    // todo: support recipes other than (crafting_shaped|crafting_shapeless))
    for (const recipe of arr) {
        if (recipe.type === 'crafting_shaped') {

        } else if (recipe.type === 'crafting_shapeless') {
            
        }
    }
    const obj = []
}