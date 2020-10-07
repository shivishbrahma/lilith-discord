const dateFormat = require('dateformat')
const embedMsg = require('../msgManager')

const sysCmd = {}
//${	msg.guild.members.get(user.id).nickname}
sysCmd.userInfo = function (msg) {
  let user = msg.author
  if (!!msg.mentions.users.first()) user = msg.mentions.users.first()
  embedMsg.color = 'info'
  const createdAt = new Date(user.createdTimestamp)
  let fields = []
  let user_info = `
    \u{1F539} ID: **${user.id}**
    \u{1F539} Name: \`${user.username}(**)\`
    \u{1F539} Created: \`${dateFormat(
      createdAt,
      'ddd, mmm d, yyyy hh:MM TT',
    )}\` **()**
    \u{1F539} Status: **(Online/Offline)**
    \u{1F539} Is Bot: ${user.bot ? '**Yes**' : '**No**'}
    `
  let member_info = `
    \u{1F539} Joined Server:
    \u{1F539} Highest Role:
    \u{1F539} Roles[]:
    `
  fields.push({
    name: 'User Information',
    value: user_info,
  })
  fields.push({
    name: 'Member Information',
    value: member_info,
  })
  embedMsg.fields = fields
  embedMsg.thumbnail = user.avatarURL()
  embedMsg.footer.text = msg.author.tag
  embedMsg.footer.icon_url = msg.author.avatarURL()
  return embedMsg.getEmbedMessage()
}

sysCmd.channelInfo = function (msg) {
  let channel = msg.channel
  if (!!msg.mentions.channels.first()) channel = msg.mentions.channels.first()
  embedMsg.color = 'info'
  const createdAt = new Date(channel.createdTimestamp)
  let fields = []
  let channel_info = `
    \u{1F539} ID: **${channel.id}**
    \u{1F539} Name: \`${channel.name}\`
    \u{1F539} Created: \`${dateFormat(
      createdAt,
      'ddd, mmm d, yyyy hh:MM TT',
    )}\` **()**
    \u{1F539} Type: **${channel.type}**
    \u{1F539} Parent: \`${channel.parent.name}\` 
    \u{1F539} Topic: ${
      channel.topic != null ? `${channel.topic}` : 'No description'
    }
    \u{1F539} Is NSFW: ${channel.nsfw ? '**Yes**' : '**No**'}
    `
  fields.push({
    name: 'Channel Information',
    value: channel_info,
  })
  embedMsg.fields = fields
  embedMsg.thumbnail = msg.guild.iconURL()
  embedMsg.footer.text = msg.author.tag
  embedMsg.footer.icon_url = msg.author.avatarURL()
  return embedMsg.getEmbedMessage()
}

sysCmd.serverInfo = function (msg) {
  let server = msg.guild
  let fields = []
  embedMsg.color = 'info'
  const createdAt = new Date(server.createdTimestamp)
  let server_info = `
    \u{1F539} ID: **${server.id}**
    \u{1F539} Name: \`${server.name}\`
    \u{1F539} Owner: \`@${server.owner.nickname}\`
    \u{1F539} Created: \`${dateFormat(
      createdAt,
      'ddd, mmm d, yyyy hh:MM TT',
    )}\` **()**
    \u{1F539} Region: **${server.region}**
    \u{1F539} Members: **${server.memberCount} ()**
	\u{1F539} Channels: **${server.channels.cache.size} ()**
    \u{1F539} Premium: **${server.premiumTier}** (${
    server.premiumSubscriptionCount
  } boosts)
    \u{1F539} Verification: **${server.verificationLevel}**
	\u{1F539} Explicit Filter: **${server.explicitContentFilter}**
	\u{1F539} Roles: [**${server.roles.cache.size}**]
    `
  fields.push({
    name: 'Server Information',
    value: server_info,
  })
  embedMsg.fields = fields
  embedMsg.thumbnail = server.iconURL()
  embedMsg.footer.text = msg.author.tag
  embedMsg.footer.icon_url = msg.author.avatarURL()
  return embedMsg.getEmbedMessage()
}

module.exports = sysCmd
