export type AuthGroup = 'ADMIN' | 'EDIT' | 'EDIT_CONTENT';


export const PERMISSIONS = new Map([
  ['ADMIN', {children: ['*']}],
  ['EDIT', {children: ['EDIT_CONTENT']}],
  ['EDIT_CONTENT', {children: []}]
]
);

export const hasChildPerm = function (parent, perm) {

  const childArr: string[] = PERMISSIONS.get(parent).children;

  if (childArr.length === 0) {return false;}

  for (const child of childArr) {
    if (child === perm) { return true; }
  }

  return childArr.some(ch => hasChildPerm(ch, perm));

}
