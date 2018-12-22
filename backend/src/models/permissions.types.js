const permissions = {

    'ADMIN': {children: '*'},
    'EDIT': {children: ['EDIT_CONTENT']},
    'EDIT_CONTENT': {children: []},
    
    hasChildPerm: function (parent, perm) {

        const childArr = permissions[parent].children;

        if (childArr.length === 0) {return false;}
      
        for (const child of childArr) {
          if (child === perm) { return true; }
        }
      
        return childArr.some(ch => permissions.hasChildPerm(ch, perm));
    },

    getChildPerms: function() {

    }


}

module.exports = permissions;