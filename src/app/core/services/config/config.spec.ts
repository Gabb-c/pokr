import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Config } from './config';

describe('Config', () => {
  let service: Config;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(Config);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpController.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('URL', () => {
    it('should point to the assets config file', () => {
      expect(Config.URL).toBe('/assets/config.json');
    });
  });

  describe('config signal', () => {
    it('should start as an empty object', () => {
      expect(service.config()).toEqual({});
    });
  });

  describe('production getter', () => {
    it('should be undefined before load', () => {
      expect(service.production).toBeUndefined();
    });

    it('should reflect the loaded production value', () => {
      service.load().subscribe();
      httpController.expectOne(Config.URL).flush({ production: true });
      expect(service.production).toBe(true);
    });
  });

  describe('load()', () => {
    it('should GET the config URL', () => {
      service.load().subscribe();
      const req = httpController.expectOne(Config.URL);
      expect(req.request.method).toBe('GET');
      req.flush({ production: false });
    });

    it('should parse and expose the config after a successful response', () => {
      let result: unknown;
      service.load().subscribe((config) => (result = config));

      httpController.expectOne(Config.URL).flush({ production: true });

      expect(result).toEqual({ production: true });
      expect(service.config()).toEqual({ production: true });
    });

    it('should default production to false when omitted from the response', () => {
      let result: unknown;
      service.load().subscribe((config) => (result = config));

      httpController.expectOne(Config.URL).flush({});

      expect(result).toEqual({ production: false });
      expect(service.config()).toEqual({ production: false });
    });

    it('should error when the response does not match the schema', () => {
      let errorThrown = false;
      service.load().subscribe({ error: () => (errorThrown = true) });

      httpController.expectOne(Config.URL).flush({ production: 'not-a-boolean' });

      expect(errorThrown).toBe(true);
    });

    it('should propagate HTTP errors', () => {
      let errorThrown = false;
      service.load().subscribe({ error: () => (errorThrown = true) });

      httpController.expectOne(Config.URL).flush(null, { status: 404, statusText: 'Not Found' });

      expect(errorThrown).toBe(true);
    });
  });
});
