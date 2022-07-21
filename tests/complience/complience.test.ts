import { ComplianceTester } from '../compliance-tester';
import { SoapConsumerClient } from '~/soap-consumer-client';

describe('Compliance', () => {
    it('test Compliance', async () => {
        const client = new SoapConsumerClient();
        const tester = new ComplianceTester(client);
        const value = await tester.runComplianceTests();
        expect(value).toBeTruthy();
    }, 100000);
});
