import dictionary from "../fixtures/locales/en/default.json";

export type Dictionary = typeof dictionary;
export interface DictionaryResponse {
  dictionary: Dictionary;
  fallbackDictionary: Dictionary;
  lang: string;
}
