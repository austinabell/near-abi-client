// import BN from 'bn.js';
// import { Account, Contract as InternalContract } from 'near-api-js';
// import { ContractMethods } from 'near-api-js/lib/contract';
import { ABI } from './abi';

// // Makes `function.name` return given name
// function nameFunction(name: string, body: (args?: any[]) => {}) {
//     return {
//         [name](...args: any[]) {
//             return body(...args);
//         }
//     }[name];
// }

// const isUint8Array = (x: any) =>
//     x && x.byteLength !== undefined && x.byteLength === x.length;

// const isObject = (x: any) =>
//     Object.prototype.toString.call(x) === '[object Object]';

// interface ChangeMethodOptions {
//     args: object;
//     methodName: string;
//     gas?: BN;
//     amount?: BN;
//     meta?: string;
//     callbackUrl?: string;
// }

export class Contract {
    readonly contractId: string;
    readonly abi?: ABI;

    /**
     * @param account NEAR account to sign change method transactions
     * @param contractId NEAR account id where the contract is deployed
     * @param options NEAR smart contract methods that your application will use. These will be available as `contract.methodName`
     */
    constructor(contractId: string, abi?: ABI) {
        this.contractId = contractId;
        this.abi = abi;

        // this.account = account;
        // this.contractId = contractId;
        // const { viewMethods = [], changeMethods = [] } = options;
        // viewMethods.forEach((methodName) => {
        //     Object.defineProperty(this, methodName, {
        //         writable: false,
        //         enumerable: true,
        //         value: nameFunction(methodName, async (args: object = {}, options = {}, ...ignored) => {
        //             if (ignored.length || !(isObject(args) || isUint8Array(args)) || !isObject(options)) {
        //                 throw new PositionalArgsError();
        //             }
        //             return this.account.viewFunction(this.contractId, methodName, args, options);
        //         })
        //     });
        // });
        // changeMethods.forEach((methodName) => {
        //     Object.defineProperty(this, methodName, {
        //         writable: false,
        //         enumerable: true,
        //         value: nameFunction(methodName, async (...args: any[]) => {
        //             if (args.length && (args.length > 3 || !(isObject(args[0]) || isUint8Array(args[0])))) {
        //                 throw new PositionalArgsError();
        //             }

        //             if(args.length > 1 || !(args[0] && args[0].args)) {
        //                 const deprecate = depd('contract.methodName(args, gas, amount)');
        //                 deprecate('use `contract.methodName({ args, gas?, amount?, callbackUrl?, meta? })` instead');
        //                 return this._changeMethod({
        //                     methodName,
        //                     args: args[0],
        //                     gas: args[1],
        //                     amount: args[2]
        //                 });
        //             }

        //             return this._changeMethod({ methodName, ...args[0] });
        //         })
        //     });
        // });
    }
}

// /**
//  * Validation on arguments being a big number from bn.js
//  * Throws if an argument is not in BN format or otherwise invalid
//  * @param argMap
//  */
// function validateBNLike(argMap: { [name: string]: any }) {
//     const bnLike = 'number, decimal string or BN';
//     for (const argName of Object.keys(argMap)) {
//         const argValue = argMap[argName];
//         if (argValue && !BN.isBN(argValue) && isNaN(argValue)) {
//             throw new ArgumentTypeError(argName, bnLike, argValue);
//         }
//     }
// }
