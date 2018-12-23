import { _mapPermsToIncludeChildren } from "../src/mapper/permission.mapper";

describe('test function that maps permissions to include all of its children', () => {

    let permsMapMockup = new Map([
        ['EDIT', {children: ['EDIT_CONTENT']}],
        ['EDIT_CONTENT', {children: ['EDIT_SMALL', 'EDIT_ICON']}],
        ['EDIT_SMALL', {children: ['EDIT_EXTRA_SMALL', 'READ']}],
        ['EDIT_ICON', {children: []}],
        ['EDIT_EXTRA_SMALL', {children: []}],
        ['READ', {children: []}],
        ['TEST', {children: []}]
      ]
      );

    let perms;


    it('should return array with all children', () => {

        const result = _mapPermsToIncludeChildren(permsMapMockup, ['EDIT', 'TEST']);
        const expectedResult = ['EDIT', 'EDIT_CONTENT', 'EDIT_SMALL', 'EDIT_ICON', 'EDIT_EXTRA_SMALL', 'READ', 'TEST'];

        console.log('result', result);

        expect(result.sort()).toEqual(expectedResult.sort());
    })


})