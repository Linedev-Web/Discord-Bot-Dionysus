module.exports = ({client, params: [oldMember, newMember]}) => {
    if (oldMember.pending && !newMember.pending) client.emit('guildMemberAdd', newMember);
}