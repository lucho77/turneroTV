import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class TurneroGlobalService {
    constructor() { }
    private turneroChangedSource = new Subject<void>();
    public turneroChanged$ = this.turneroChangedSource.asObservable();
    private turne: boolean;
    private detalle: string;
    setearTurnoGlobal(t:boolean) {
        this.turne = t;
      this.turneroChangedSource.next();
      }
      getTurne() {
        return this.turne;
    }
}
