function checkStringLength(...strings) {
  const isEverythingValid = strings.every((string) => string.trim().length > 0)
  if (!isEverythingValid) throw new Error('Please enter valid values')
}

export default checkStringLength
