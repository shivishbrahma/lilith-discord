const dateFormat = require('dateformat')
const embedMsg = require('../msgManager')
const { bold, inline, italic, titleCase, objectPrint } = embedMsg.stringHandler
const sysCmd = {}

/**
 * * Common Getters
 */

/**
 * Returns discord entity id
 * @param {Discord.(User|Server|Channel)} user
 */
sysCmd.getId = function (entity) {
  return entity.id
}

sysCmd.getName = function (entity) {
  return entity.name
}

sysCmd.getCreationDate = function (entity) {
  const createdAt = new Date(entity.createdTimestamp)
  return dateFormat(createdAt, 'ddd, mmm d, yyyy hh:MM TT')
}

/**
 * * User Getters
 */

sysCmd.getUsername = function (user) {
  return user.username
}

sysCmd.getNickname = function (user) {
  return user.presence.member.nickname
}

sysCmd.getJoinedDate = function (user) {
  const joinedAt = user.presence.member.joinedTimestamp
  return dateFormat(joinedAt, 'ddd, mmm d, yyyy hh:MM TT')
}

sysCmd.getBotStat = function (user) {
  return user.bot ? 'Yes' : 'No'
}

sysCmd.getHighestRole = function (user) {
  return user.presence.member.roles.highest.name
}

sysCmd.getRoles = function (user) {
  let roles = user.presence.member.roles.cache,
    r = []
  for (role of roles) {
    if (role[1].name !== '@everyone') r.push(role[1].name)
  }
  return r
}

sysCmd.getPresenceStatus = function (user) {
  const psMap = {
    online: 'Online',
    idle: 'Idle',
    offline: 'Offline',
    dnd: 'Do Not Disturb',
  }
  return psMap[user.presence.status]
}

/**
 * * Channel Getters
 */

sysCmd.getTopic = function (channel) {
  return !!channel.topic ? `${channel.topic}` : 'No description'
}

sysCmd.getNSFW = function (channel) {
  return channel.nsfw ? 'Yes' : 'No'
}

/**
 * * Server Getters
 */
sysCmd.getExplicitContentFilter = function (server) {
  const ecfMap = {
    DISABLED: 'Disabled',
    MEMBERS_WITHOUT_ROLES: 'No role',
    ALL_MEMBERS: 'All',
  }
  return ecfMap[server.explicitContentFilter]
}

sysCmd.getSysRoles = function (server) {
  const roles = server.roles.cache,
    r = []
  for (role of roles) {
    if (role[1].name !== '@everyone') r.push(role[1].name)
  }
  return r
}

sysCmd.getVerificationLevel = function (server) {
  return titleCase(server.verificationLevel.replace('_', ' '))
}

sysCmd.getChannelTypes = function (channels) {
  r = {}
  for (channel of channels) {
    if (r.hasOwnProperty(channel[1].type)) r[channel[1].type]++
    else r[channel[1].type] = 1
  }
  return r
}

sysCmd.getUserTypes = function (users) {
  r = { 'cached human': 0, bots: 0 }
  for (user of users) {
    if (user[1].user.bot) r['bots']++
    else r['cached human']++
  }
  return r
}

/**
 *
 * @param {*} msg
 */
sysCmd.userInfo = function (msg) {
  let user = msg.author
  if (!!msg.mentions.users.first()) user = msg.mentions.users.first()
  embedMsg.color = 'info'
  let fields = []
  let roles = sysCmd.getRoles(user)
  roles.forEach((e, i) => {
    roles[i] = inline(e)
  })

  let user_info = `
    \u{1F539} ID: ${bold(sysCmd.getId(user))}
    \u{1F539} Name: ${inline(sysCmd.getUsername(user))}
    \u{1F539} Created: ${inline(sysCmd.getCreationDate(user))}
    \u{1F539} Status: ${bold(sysCmd.getPresenceStatus(user))}
    \u{1F539} Is Bot: ${bold(sysCmd.getBotStat(user))}
    `
  let member_info = `
    ${
      !!sysCmd.getNickname(user)
        ? `\u{1F539} Nickname: ${bold(sysCmd.getNickname(user))}`
        : ''
    }
    \u{1F539} Joined Server: ${inline(sysCmd.getJoinedDate(user))}
    \u{1F539} Highest Role: ${bold(sysCmd.getHighestRole(user))}
    \u{1F539} Roles[${bold(roles.length)}]:
    ${roles.join(' | ')}
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
  let fields = []
  let channel_info = `
    \u{1F539} ID: ${bold(sysCmd.getId(channel))}
    \u{1F539} Name: ${inline(sysCmd.getName(channel))}
    \u{1F539} Created: ${inline(sysCmd.getCreationDate(channel))}
    \u{1F539} Type: ${bold(titleCase(channel.type))}
    \u{1F539} Parent: ${bold(italic(channel.parent.name))} 
    \u{1F539} Topic: ${italic(sysCmd.getTopic(channel))}
    \u{1F539} Is NSFW: ${bold(sysCmd.getNSFW(channel))}
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

/**
 * Server Options
 */

sysCmd.serverInfo = function (msg) {
  let server = msg.guild
  let fields = []
  let roles = sysCmd.getSysRoles(server)
  roles.forEach((e, i) => {
    roles[i] = inline(e)
  })
  let chTypes = sysCmd.getChannelTypes(server.channels.cache),
    uTypes = sysCmd.getUserTypes(server.members.cache)
  embedMsg.color = 'info'
  let server_info = `
    \u{1F539} ID: ${bold(sysCmd.getId(server))}
    \u{1F539} Name: ${inline(sysCmd.getName(server))}
    \u{1F539} Owner: ${server.owner}
    \u{1F539} Created: ${inline(sysCmd.getCreationDate(server))} 
    \u{1F539} Region: ${bold(
      titleCase(server.region),
    )} :flag_${server.region.slice(0, 2)}:
    \u{1F539} Members: ${bold(server.memberCount)} (${objectPrint(uTypes)})
	\u{1F539} Channels: ${bold(server.channels.cache.size)} (${objectPrint(
    chTypes,
  )})
    \u{1F539} Premium: ${bold(server.premiumTier)} (${
    server.premiumSubscriptionCount
  } boosts)
    \u{1F539} Verification: ${bold(sysCmd.getVerificationLevel(server))}
	\u{1F539} Explicit Filter: ${bold(sysCmd.getExplicitContentFilter(server))}
  \u{1F539} Roles: [${bold(roles.length)}]
  ${roles.join(' | ')}
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
