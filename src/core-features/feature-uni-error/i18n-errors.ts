import i18n from '../feature-i18n/i18n';

export function getI18nError(
  errorKey: string | undefined,
  errorParameters: object | undefined = undefined,
  defaultValue: string | undefined = undefined
) : string | undefined {
  return errorKey && i18n(errorKey, errorParameters, defaultValue);
}
