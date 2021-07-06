import { SoapClientFactory } from '../../src/SoapClientFactory';

describe('Soap Client factory', () => {
    it('Factory Has Custom Options', () => {
        const customOptions = {
            foo: 'bar'
        };
        const factory = new SoapClientFactory(customOptions);
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
        const factory = new SoapClientFactory(customOptions);

        const value = factory.finalSoapOptions().endpoint;
        expect(value).toBe('foo');
    });
  });