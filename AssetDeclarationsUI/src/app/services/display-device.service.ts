import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DisplayDeviceService {
  isMobile = signal<boolean>(true);
  isDesktop = computed(() => !this.isMobile());

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait])
      .subscribe((result) => {
        this.isMobile.set(result.matches);
      });
  }
}
