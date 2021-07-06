import { ComplianceTester } from '../ComplianceTester';
import { SoapConsumerClient } from '../../src/SoapConsumerClient';

describe('Compliance', () => {
  it('test Compliance', async () => {
    const client = new SoapConsumerClient();
    const tester = new ComplianceTester(client);
    const value = await tester.runComplianceTests();
    expect(value).toBeTrue();
  });
});
