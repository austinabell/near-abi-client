import BN from 'bn.js';
import { Account as InternalAccount, Connection } from 'near-api-js';
import { FinalExecutionOutcome } from 'near-api-js/lib/providers';

function parseJsonFromRawResponse(response: Uint8Array): any {
    return JSON.parse(Buffer.from(response).toString());
}

function bytesJsonStringify(input: any): Buffer {
    return Buffer.from(JSON.stringify(input));
}

function ignoreSerialization(input: Buffer): Buffer {
    return input;
}

export interface FunctionCallOptions {
    /** max amount of gas that method call can use */
    gas?: BN;
    /** amount of NEAR (in yoctoNEAR) to send together with the call */
    attachedDeposit?: BN;
    /**
     * Metadata to send the NEAR Wallet if using it to sign transactions.
     * @see {@link RequestSignTransactionsOptions}
     */
    walletMeta?: string;
    /**
     * Callback url to send the NEAR Wallet if using it to sign transactions.
     * @see {@link RequestSignTransactionsOptions}
     */
    walletCallbackUrl?: string;
    /**
     * Convert input arguments into bytes array.
     */
    stringify?: (input: any) => Buffer;
}

export class Account {
    readonly internal: InternalAccount;

    // TODO connection should not be coming from NAJ
    constructor(connection: Connection, accountId: string) {
        this.internal = new InternalAccount(connection, accountId);
    }

    // TODO maybe these should be named to avoid misuse of strings?
    async viewFunction(
        contractId: string,
        methodName: string,
        args: any,
        {
            parse = parseJsonFromRawResponse,
            stringify = bytesJsonStringify,
        } = {}
    ): Promise<any> {
        // This line is to skip the validation from within near-api-js. For some reason
        // it disallows serializing an array as JSON.
        const serializedArgs = stringify(args);

        return this.internal.viewFunction(contractId, methodName, serializedArgs, {
            // Args are already serialized as above
            stringify: ignoreSerialization,
            parse,
        });
    }

    async functionCall(
        contractId: string,
        methodName: string,
        args: any,
        options?: FunctionCallOptions
        // TODO remove exporting type from near-api-js lib
    ): Promise<FinalExecutionOutcome> {
        const {
            gas,
            attachedDeposit,
            walletMeta,
            walletCallbackUrl,
            stringify,
        } = options;
        return this.internal.functionCall({
            contractId,
            methodName,
            args,
            gas,
            attachedDeposit,
            walletMeta,
            walletCallbackUrl,
            stringify,
        });
    }
}
