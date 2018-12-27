import {_getChildPerms, PERMISSIONS } from "../models/permissions.types";

/**
 * map permissions to include all child-permissions
 * Reason: We avoid using redundant code on the frontend, no need to check child-perms there
 */

export const mapPermsToIncludeChildren = function (userPerms) {
    return _mapPermsToIncludeChildren(PERMISSIONS, userPerms);
}


export const _mapPermsToIncludeChildren = function(permsConfigMap, permissions) {
    return permissions.reduce((allPerms, perm) => {
        allPerms.push(...[perm, ..._getChildPerms(permsConfigMap, perm)]);
        return allPerms;
    }, [])
}