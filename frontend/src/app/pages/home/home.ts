import { Component, signal, computed, inject, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UrlService } from '../../services/url';
import { environment } from '../../../environments/environment';

export interface ShortenedUrl {
  id: string;

  originalUrl: string;

  shortCode: string;

  shortUrl: string;

  clicks: number;

  createdAt: Date;
}

@Component({
  selector: 'app-home',

  standalone: true,

  imports: [CommonModule, FormsModule],

  templateUrl: './home.html',

  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly urlService = inject(UrlService);

  private readonly BASE_URL = environment.nodeApiUrl;

  // State
  inputUrl = signal('');

  isLoading = signal(false);

  errorMessage = signal('');

  result = signal<ShortenedUrl | null>(null);

  recentUrls = signal<ShortenedUrl[]>([]);

  isLoadingRecent = signal(false);

  copiedId = signal('');

  // Computed
  hasResult = computed(() => this.result() !== null);

  hasRecent = computed(() => this.recentUrls().length > 0);

  ngOnInit() {
    this.loadRecentUrls();
  }

  isValidUrl(url: string): boolean {
    try {
      const u = new URL(url);

      return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
      return false;
    }
  }

  async shortenUrl() {
    const originalUrl = this.inputUrl().trim();

    this.errorMessage.set('');

    if (!originalUrl) {
      this.errorMessage.set('Please enter URL');

      return;
    }

    if (!this.isValidUrl(originalUrl)) {
      this.errorMessage.set('Invalid URL');

      return;
    }

    try {
      this.isLoading.set(true);

      const response: any = await this.urlService.createURL({
        originalUrl,
      });

      const url = response.data;

      this.result.set({
        id: crypto.randomUUID(),

        originalUrl: url.originalUrl,

        shortCode: url.shortCode,

        shortUrl: url.shortUrl,

        clicks: url.clicks,

        createdAt: new Date(),
      });

      await this.loadRecentUrls();

      this.inputUrl.set('');
    } catch {
      this.errorMessage.set('Unable to shorten URL');
    } finally {
      this.isLoading.set(false);
    }
  }

  async loadRecentUrls() {
    try {
      this.isLoadingRecent.set(true);

      const response: any = await this.urlService.getAllUrls();

      const urls = response.data.map((item: any) => ({
        id: item._id,

        originalUrl: item.originalUrl,

        shortCode: item.shortCode,

        shortUrl: `${this.BASE_URL}url/${item.shortCode}`,

        clicks: item.clicks,

        createdAt: new Date(item.createdAt),
      }));

      this.recentUrls.set(urls);
    } catch {
      this.errorMessage.set('Unable to load URLs');
    } finally {
      this.isLoadingRecent.set(false);
    }
  }

  async copyToClipboard(text: string, id: string) {
    await navigator.clipboard.writeText(text);

    this.copiedId.set(id);

    setTimeout(() => {
      this.copiedId.set('');
    }, 2000);
  }

  openLink(url: string) {
    this.urlService.redirectUrl(url);
  }

  truncate(str: string, max = 50) {
    return str.length > max ? str.slice(0, max) + '...' : str;
  }

  formatDate(date: Date) {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  }

  formatClicks(clicks: number) {
    return clicks >= 1000 ? `${(clicks / 1000).toFixed(1)}k` : String(clicks);
  }

  onInput(event: Event) {
    this.inputUrl.set((event.target as HTMLInputElement).value);

    this.errorMessage.set('');
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.shortenUrl();
    }
  }
}
