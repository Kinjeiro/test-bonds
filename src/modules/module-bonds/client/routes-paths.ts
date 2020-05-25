import MODULE_NAME from '../module-name';

export const PARAM__BOND_ID = 'id';

export function pathToBond(bondId: string): string {
  // todo @ANKU @LOW - best crete special map module_name => prefix, but for example use rule: module_name = prefix
  return `/${MODULE_NAME}/${bondId}`;
}
