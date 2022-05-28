import schema from './test_schema.json';
import { Contract } from '../src/index';
import { Account, connect,keyStores, ConnectConfig } from 'near-api-js';

test('ABI deserialization', async() => {
	const keyStore = new keyStores.InMemoryKeyStore();
	const config: ConnectConfig = {
		networkId: 'unittest',
		nodeUrl: 'https://rpc.ci-testnet.near.org',
		masterAccount: 'test.near',
		headers: {},
		deps: {
			keyStore
		}
	};
	const near = await connect(config);
	// @ts-ignore
	const account = new Account(near.connection, "test.testnet");
	new Contract("test", schema);
});