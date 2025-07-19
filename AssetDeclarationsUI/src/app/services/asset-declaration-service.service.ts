import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssetDeclaration } from '../model/assetDeclaration.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AssetDeclarationUpdate } from '../model/assetDeclarationUpdate.interface';

@Injectable({
  providedIn: 'root',
})
export class AssetDeclarationServiceService {
  url = 'AssetDeclaration';

  constructor(private http: HttpClient) {}

  update(
    assetDeclaration: AssetDeclarationUpdate
  ): Observable<AssetDeclaration> {
    return this.http.put<AssetDeclaration>(
      `${environment.apiUrl}/${this.url}/Update`,
      assetDeclaration
    );
  }
}
