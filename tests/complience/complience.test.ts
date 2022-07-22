import { ComplianceTester } from '../compliance-tester';
import { SoapConsumerClient } from '~/soap-consumer-client';
import { SoapClientFactory } from '~/soap-client-factory';
import { install } from '@nodecfdi/cfdiutils-common';
import { DOMParser, XMLSerializer, DOMImplementation } from '@xmldom/xmldom';

describe('Compliance Axios', () => {
    it('test Compliance', async () => {
        install(new DOMParser(), new XMLSerializer(), new DOMImplementation());
        const soapClientFactory = new SoapClientFactory({ timeout: 50000 });
        const client = new SoapConsumerClient(soapClientFactory);
        const tester = new ComplianceTester(client);
        const value = await tester.runComplianceTests();
        expect(value).toBeTruthy();
    }, 100000);
});
