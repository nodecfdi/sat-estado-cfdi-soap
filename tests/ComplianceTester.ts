/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Consumer, ConsumerClientInterface } from '@nodecfdi/sat-estado-cfdi';
import { DiscoverExtractor } from '@nodecfdi/cfdi-expresiones';

export class ComplianceTester {
  private client: ConsumerClientInterface;

  constructor(client: ConsumerClientInterface) {
    this.client = client;
  }

  public async runComplianceTests(): Promise<boolean> {
    const contactWebserviceWithActiveCfdi = async (): Promise<void> => {
      await this.contactWebServiceWithActiveCfdi();
    };
    const contactWebserviceWithCancelledCfdi = async (): Promise<void> => {
      await this.contactWebServiceWithCancelledCfdi();
    };
    const tests = [contactWebserviceWithActiveCfdi, contactWebserviceWithCancelledCfdi];
    const promises = tests.map(async (clousere) => {
      try {
        await clousere();
      } catch (error) {
        const message = `ConsumerClientInterface did not pass: ${clousere.name}`;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new Error(`${message} ${error.message}`);
      }
    });
    await Promise.all(promises);
    return true;
  }

  protected async contactWebServiceWithActiveCfdi(): Promise<void> {
    const expressionExtractor = new DiscoverExtractor();
    const expression = expressionExtractor.format(
      {
        re: 'POT9207213D6',
        rr: 'DIM8701081LA',
        tt: '2010.01',
        id: 'CEE4BE01-ADFA-4DEB-8421-ADD60F0BEDAC',
        fe: '/OAgdg==',
      },
      'CFDI33',
    );
    const consumer = new Consumer(this.client);
    const response = await consumer.executeAsync(expression);
    
    if (!response.getQuery().isFound()) {
      throw new Error('It was expected CFDI status request: found');
    }
    if (!response.getDocument().isActive()) {
      throw new Error('It was expected CFDI status active: active');
    }
    if (!response.getCancellable().byDirectCall()) {
      throw new Error('It was expected CFDI status cancellable: directMethod');
    }
    if (!response.getCancellation().isUndefined()) {
      throw new Error('It was expected CFDI status cancellation: undefined');
    }
    if (!response.getEfos().isExcluded()) {
      throw new Error('It was expected the efos status: excluded');
    }
  }

  protected async contactWebServiceWithCancelledCfdi(): Promise<void> {
    const expressionExtractor = new DiscoverExtractor();
    const expression = expressionExtractor.format(
      {
        re: 'DIM8701081LA',
        rr: 'XEXX010101000',
        tt: '8413.00',
        id: '3be40815-916c-4c91-84e2-6070d4bc3949',
        fe: '3f86Og==',
      },
      'CFDI33',
    );

    const consumer = new Consumer(this.client);
    const response = await consumer.executeAsync(expression);

    if (!response.getQuery().isFound()) {
      throw new Error('It was expected CFDI status request: found');
    }
    if (!response.getDocument().isCanceled()) {
      throw new Error('It was expected CFDI status active: cancelled');
    }
    if (!response.getCancellable().notCancellable()) {
      throw new Error('It was expected CFDI status cancellable: notCancellable');
    }
    if (!response.getCancellation().isUndefined()) {
      throw new Error('It was expected CFDI status cancellation: undefined');
    }
    if (!response.getEfos().isExcluded()) {
      throw new Error('It was expected the efos status: excluded');
    }
  }
}
