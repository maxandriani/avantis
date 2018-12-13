import { Injectable } from '@angular/core';
import { MediaMatcher, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResolutionService {

  constructor(
    protected $breakpointObserver: BreakpointObserver
  ) {
    this.mobileObservable = this.$breakpointObserver
                                .observe(['(max-width: 600px)']);

    this.mobileObservable
        .subscribe(state => this.actualState = state);
  }

  protected mobileObservable: Observable<BreakpointState>;
  protected actualState: BreakpointState;

  get isMobile(): boolean {
    return (this.actualState) ? this.actualState.matches : true;
  }

  asObservable(): Observable<BreakpointState> {
    return this.mobileObservable;
  }

}
