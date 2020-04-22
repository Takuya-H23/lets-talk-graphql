/*eslint-disable */
import checkName from '../src/utils/checkName'
import validateStringLength from '../src/utils/validateStringLength'

test('Return "Anonymous if value is an empty string"', () => {
  expect(checkName('')).toBe('Anonymous')
})

test('Return the name as it is', () => {
  expect(checkName('Andrew')).toBe('Andrew')
})

test('Return undefined for every string is not empty', () => {
  expect(validateStringLength('Hello')).toBe(undefined)
})

test('Throws an error for containing empty strings', () => {
  expect(() => {
    validateStringLength('Hello', '', 'World')
  }).toThrow()
})
