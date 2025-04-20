import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssetDeclaration } from '../model/assetDeclaration.type';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssetDeclarationServiceService {
  url = 'AssetDeclaration';

  constructor(private http: HttpClient) {}

  update(
    id: number,
    assetDeclaration: AssetDeclaration
  ): Observable<AssetDeclaration> {
    return this.http.put<AssetDeclaration>(
      `${environment.apiUrl}/${this.url}/Put/${id}`,
      assetDeclaration
    );
  }
}
