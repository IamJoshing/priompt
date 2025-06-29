/* tslint:disable */
/* eslint-disable */

/* auto-generated by NAPI-RS */

export const enum SupportedEncoding {
  Cl100k = 0,
  Llama3 = 1,
  O200k = 2,
  Codestral = 3
}
export const enum SpecialTokenAction {
  /** The special token is forbidden. If it is included in the string, an error will be returned. */
  Forbidden = 0,
  /** The special token is tokenized as normal text. */
  NormalText = 1,
  /** The special token is treated as the special token it is. If this is applied to a specific text and the text is NOT a special token then an error will be returned. If it is the default action no error will be returned, don't worry. */
  Special = 2
}
export declare function getTokenizer(): Tokenizer
export declare class Tokenizer {
  exactNumTokensNoSpecialTokens(text: string, encoding: SupportedEncoding): Promise<number>
  exactNumTokens(text: string, encoding: SupportedEncoding, specialTokenDefaultAction: SpecialTokenAction, specialTokenOverrides: Record<string, SpecialTokenAction>): Promise<number>
  encodeCl100KNoSpecialTokens(text: string): Promise<Array<number>>
  approxNumTokens(text: string, encoding: SupportedEncoding, replaceSpacesWithLowerOneEighthBlock: boolean): Promise<number>
  encode(text: string, encoding: SupportedEncoding, specialTokenDefaultAction: SpecialTokenAction, specialTokenOverrides: Record<string, SpecialTokenAction>): Promise<Array<number>>
  encodeSingleToken(bytes: Uint8Array, encoding: SupportedEncoding): Promise<number>
  decodeByte(token: number, encoding: SupportedEncoding): Promise<Uint8Array>
  decode(encodedTokens: Array<number>, encoding: SupportedEncoding): Promise<string>
}
export declare class SyncTokenizer {
  constructor()
  approxNumTokens(text: string, encoding: SupportedEncoding): number
}
