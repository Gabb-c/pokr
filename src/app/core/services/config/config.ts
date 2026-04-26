import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { z } from 'zod';

export const configSchema = z.object({
  production: z.boolean().default(false),
});

export type AppConfig = z.infer<typeof configSchema>;

@Injectable({ providedIn: 'root' })
export class Config {
  public static readonly URL = '/assets/config.json';
  private readonly http = inject(HttpClient);
  private readonly _config = signal<AppConfig>({} as AppConfig);

  public readonly config = this._config.asReadonly();

  public get production() {
    return this._config().production;
  }

  public load() {
    return this.http.get(Config.URL).pipe(
      map((raw) => configSchema.parse(raw)),
      tap((config) => this._config.set(config)),
    );
  }
}
