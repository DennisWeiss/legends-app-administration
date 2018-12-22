
import {_getChildPerms} from '../src/models/permissions.types'



describe('function to get all child permissions from parent-perm. (getChildPerms)', () => {
    let PERMISSIONS;

it('should throw an error indicating that children array is missing', () => {
    PERMISSIONS = new Map([
        ['ADMIN', {}]
      ])

      expect(() => {_getChildPerms(PERMISSIONS, 'ADMIN')}).toThrow('needs to have object with children-prop as value!');

})

it('should return an empty array', () => {
 
    PERMISSIONS = new Map([
        ['ADMIN', {children: []}],
    ])

    const result = _getChildPerms(PERMISSIONS, 'ADMIN')  

    expect(result).toEqual([]);

})

it('should throw an error indicating that permission does not exist', () => {
    PERMISSIONS = new Map([
        ['ADMIN', {children: ['a', 'b', 'c', 'd']}]
      ])
      
      expect(() => {_getChildPerms(PERMISSIONS, 'EDIT')}).toThrow('not defined!');    

})

it('should throw error if a child is not defined in map', () => {
  PERMISSIONS = new Map([
    ['ADMIN', {children: ['a', 'b', 'c', 'd']}]

  ])
  
  expect(() => {_getChildPerms(PERMISSIONS, 'ADMIN')}).toThrow('not defined!');

})

it('should return all direct children', () => {
    PERMISSIONS = new Map([

        ['ADMIN', {children: ['a', 'b', 'c', 'd']}],
        ['a', {children: []}],
        ['b', {children: []}],
        ['c', {children: []}],
        ['d', {children: []}],
    ])

    const result = _getChildPerms(PERMISSIONS, 'ADMIN')  
    const expectedResult = ['a', 'b', 'c', 'd'];

    expect(result.sort()).toEqual(expectedResult.sort());
})

it('should return all children', () => {

    PERMISSIONS = new Map([
        ['ADMIN', {children: ['*']}],
        ['EDIT', {children: ['EDIT_CONTENT']}],
        ['EDIT_CONTENT', {children: ['EDIT_SMALL', 'EDIT_ICON']}],
        ['EDIT_SMALL', {children: ['EDIT_EXTRA_SMALL', 'READ']}],
        ['EDIT_ICON', {children: []}],
        ['EDIT_EXTRA_SMALL', {children: []}],
        ['READ', {children: []}]
      ]
      );

        const result = _getChildPerms(PERMISSIONS, 'EDIT')  
        const expectedResult = ['EDIT_CONTENT', 'EDIT_SMALL', 'EDIT_ICON', 'EDIT_EXTRA_SMALL', 'READ'];

        expect(result.sort()).toEqual(expectedResult.sort());
})

})