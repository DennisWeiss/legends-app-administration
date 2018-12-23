/**
 * PERMISSIONS holds all permissions as key-value-pairs
 * key: name of the perm as a string
 * value: object containing children prop that holds an array of children for given permission 
 * 
 *  Example: ['EDIT_ALL', {children: ['EDIT_SUBPART', 'READ_ONLY']}]
 */


export const PERMISSIONS = new Map([
    ['ADMIN', {children: []}],
    ['EDIT', {children: ['EDIT_CONTENT']}],
    ['EDIT_CONTENT', {children: []}],
    ['READ_ONLY', {children: []}]
  ]
  );
  

  /**
   * get all children of permission in a recursive manner
   * @param {*} parent name of the permission to get all childPerms from
   */
  
  export const getChildPerms = function(parent) {
    return _getChildPerms(PERMISSIONS, parent);
  }


// used for unit testing specifically
  export const _getChildPerms = function(perms, parent) {

    if(!perms.has(parent)) {
      throw new Error(`Permission '${parent}' is not defined!`);
    }
  
    const childArr = perms.get(parent).children;

    if(typeof childArr === 'undefined') {
      throw new Error(`Permission '${parent}' needs to have object with children-prop as value!`)
    }

    if(childArr.length === 0) {return []};

    const result = [];

    for(let child of childArr) {
      result.push(..._getChildPerms(perms, child), child);
    }

    return result;

  }






