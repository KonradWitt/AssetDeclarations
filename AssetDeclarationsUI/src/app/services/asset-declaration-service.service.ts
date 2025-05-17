import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssetDeclaration } from '../model/assetDeclaration.interface';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssetDeclarationServiceService {
  url = 'AssetDeclaration';

  constructor(private http: HttpClient) {}

  update(
    assetDeclaration: AssetDeclaration
  ): Observable<AssetDeclaration> {
    return this.http.put<AssetDeclaration>(
      `${environment.apiUrl}/${this.url}/Update`,
      assetDeclaration
    );
  }
}
