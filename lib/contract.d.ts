import { Account, Contract as InternalContract } from 'near-api-js';
export interface ABI {
    /**
     * Methods that change state. These methods cost gas and require a signed transaction.
     *
     * @see {@link Account.functionCall}
     */
    changeMethods: string[];
    /**
     * View methods do not require a signed transaction.
     *
     * @@see {@link Account.viewFunction}
     */
    viewMethods: string[];
}
export declare class Contract {
    readonly internalContract: InternalContract;
    /**
     * @param account NEAR account to sign change method transactions
     * @param contractId NEAR account id where the contract is deployed
     * @param options NEAR smart contract methods that your application will use. These will be available as `contract.methodName`
     */
    constructor(account: Account, contractId: string, abi: ABI);
}
