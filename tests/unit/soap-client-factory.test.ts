import { SoapClientFactory } from 'src/soap-client-factory';

describe('Soap Client factory', () => {
    it('Factory Has Custom Options', () => {
        const customOptions = {
            foo: 'bar',
        };
        const factory = new SoapClientFactory(customOptions as Record<string, string>);
        expect(customOptions).toBe(factory.getCustomSoapOptions());
    });

    it('Final Options Override Default Options', () => {
        const expectedValue = 10;
        const customOptions = {
            timeout: expectedValue,
        };
        const factory = new SoapClientFactory(customOptions);

        const value = factory.finalSoapOptions();
        expect(value.timeout).toBe(expectedValue);
    });

    it('Final Options Override Location', () => {
        const customOptions = {
            endpoint: 'foo',
        };
        const factory = new SoapClientFactory(customOptions as Record<string, string>);

        const value = factory.finalSoapOptions().endpoint;
        expect(value).toBe('foo');
    });
});
