function buildMessage(entity, action) {
  return action === 'list'
    ? `${entity}s ${action}ed!`
    : `${entity} ${action}d!`;
}

module.exports = { buildMessage };
