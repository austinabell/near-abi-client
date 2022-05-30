"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = void 0;
function deserializeJSON(response) {
    return JSON.parse(Buffer.from(response).toString());
}
function serializeJSON(input) {
    return Buffer.from(JSON.stringify(input));
}
// Helper function so that
function ignoreSerialization(input) {
    return input;
}
async function callInternal(account, contractId, methodName, args, opts) {
    const { gas, attachedDeposit, walletMeta, walletCallbackUrl } = opts;
    return account.functionCall({
        contractId,
        methodName,
        args,
        gas,
        attachedDeposit,
        walletMeta,
        walletCallbackUrl,
        // Ignore because we have already serialized args
        stringify: ignoreSerialization,
    });
}
async function viewInternal(connection, contractId, functionName, args) {
    //* Not ideal that this logic is copied, but NAJ requires an Account to
    //* perform a view call, which isn't necessary.
    const serializedArgs = args.toString('base64');
    const result = await connection.provider.query({
        request_type: 'call_function',
        account_id: contractId,
        method_name: functionName,
        args_base64: serializedArgs,
        finality: 'optimistic',
    });
    if (result.logs) {
        this.printLogs(contractId, result.logs);
    }
    return (result.result && result.result.length > 0 && Buffer.from(result.result));
}
class Contract {
    connection;
    contractId;
    abi;
    /**
     * @param connection Connection to NEAR network through RPC.
     * @param contractId NEAR account id where the contract is deployed.
     * @param abi ABI schema which will be used to generate methods to be called on this Contract
     */
    // TODO not ideal to include NAJ type in constructor
    constructor(connection, contractId, abi) {
        this.connection = connection;
        this.contractId = contractId;
        this.abi = abi;
        // TODO this abi is optional, but are the only methods on Contract right now.
        // TODO Maybe worth making it useful outside of just ABI calls or making it mandatory?
        this.abi?.methods.forEach((function_name) => {
            const funcName = function_name.name;
            const isView = function_name.is_view;
            // Create method on this contract object to be able to call methods.
            Object.defineProperty(this, funcName, {
                writable: false,
                enumerable: true,
                // TODO args could be better here, would be ideal to have positional args maybe?
                value: (args) => {
                    const { connection, contractId } = this;
                    const func = {
                        // Include a call function if the function is not view only.
                        callFrom: isView
                            ? undefined
                            : async function (account, opts) {
                                // TODO should serialize based on protocol
                                const paramBytes = args
                                    ? serializeJSON(args)
                                    : Buffer.alloc(0);
                                // Using inner NAJ APIs for result for consistency, but this might
                                // not be ideal API.
                                return callInternal(account, contractId, funcName, paramBytes, opts);
                            },
                        view: async function () {
                            // TODO this should serialize based on protocol from schema
                            const paramBytes = args
                                ? serializeJSON(args)
                                : Buffer.alloc(0);
                            const returnBytes = await viewInternal(connection, contractId, funcName, paramBytes);
                            // TODO deserialize based on protocol from schema
                            return deserializeJSON(returnBytes);
                        },
                    };
                    return func;
                },
            });
        });
    }
}
exports.Contract = Contract;
