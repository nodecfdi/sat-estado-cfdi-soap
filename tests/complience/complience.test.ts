import { ComplianceTester } from '../compliance-tester';
import { SoapConsumerClient } from '~/soap-consumer-client';
import { SoapClientFactory } from '~/soap-client-factory';

describe('Compliance', () => {
    it('test Compliance', async () => {
        const soapClientFactory = new SoapClientFactory({ timeout: 100000 });
        const client = new SoapConsumerClient(soapClientFactory);
        const tester = new ComplianceTester(client);
        const value = await tester.runComplianceTests();
        expect(value).toBeTruthy();
    }, 100000);
});
