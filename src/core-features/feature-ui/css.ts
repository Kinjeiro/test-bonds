//@ts-ignore
import parse from 'jss-template/lib/parse';

//// Fix flow String.raw type
//declare class String extends String {
//  static raw(callSite: string[] | $Shape<{raw: string[]}>, ...substitutions: any[]): string
//}

//type Css = (strings: string[], ...values: string[] | number[]) => string;

//const css: Css = (template: TemplateStringsArray, ...substitutions: any[]) => parse(
const css = (template: TemplateStringsArray, ...substitutions: any[]): {
  [s: string]: any,
} => parse(
  String.raw(template, ...substitutions),
);

export default css;
