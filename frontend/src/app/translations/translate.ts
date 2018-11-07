import translations from './translations.json'

export default (identifier: string, langIso: string) => (key: string) =>
  translations && translations[langIso] && translations[langIso][identifier] && translations[langIso][identifier][key] != null ?
    translations[langIso][identifier][key] :
    `${identifier}.${key}`
