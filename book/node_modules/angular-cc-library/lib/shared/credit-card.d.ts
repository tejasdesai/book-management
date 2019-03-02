export declare class CreditCard {
    static cards(): {
        type: string;
        patterns: number[];
        format: RegExp;
        length: number[];
        cvvLength: number[];
        luhn: boolean;
    }[];
    static cardFromNumber(num: any): any;
    static restrictNumeric(e: any): boolean;
    static hasTextSelected(target: any): boolean;
    static cardType(num: any): any;
    static formatCardNumber(num: any): any;
    static safeVal(value: any, target: any): any;
    static isCardNumber(key: any, target: any): any;
    static restrictExpiry(key: any, target: any): boolean;
    static replaceFullWidthChars(str: any): string;
    static formatExpiry(expiry: any): string;
    static restrictCvc(key: any, target: any): boolean;
    static luhnCheck(num: any): boolean;
}
