function checkName(name) {
  return name.trim().length === 0 ? 'Anonymous' : name
}

export default checkName
