import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = environment.nodeApiUrl;

  createURL(payload: { originalUrl: string }) {
    return firstValueFrom(this.http.post(this.baseUrl + 'url', payload));
  }

  getAllUrls() {
    return firstValueFrom(this.http.get(this.baseUrl + 'url'));
  }

  redirectUrl(shortCode: string) {
    return firstValueFrom(this.http.get(this.baseUrl + `url/${shortCode}`));
  }
}
