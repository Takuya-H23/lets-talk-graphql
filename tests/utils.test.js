/*eslint-disable */
import checkName from '../src/utils/checkName'
import validateStringLength from '../src/utils/validateStringLength'

test('Should return "Anonymous if value is an empty string"', () => {
  expect(checkName('')).toBe('Anonymous')
})

test('Should return the name as it is', () => {
  expect(checkName('Andrew')).toBe('Andrew')
})

test('Should return undefined for every string is not empty', () => {
  expect(validateStringLength('Hello')).toBe(undefined)
})

test('Should throw an error for containing empty strings', () => {
  expect(() => {
    validateStringLength('Hello', '', 'World')
  }).toThrow()
})
