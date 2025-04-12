import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UploadComponent } from './components/upload/upload.component';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { ChatComponent } from './components/chat/chat.component';
import { DownloadComponent } from './components/download/download.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'analysis', component: AnalysisComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'download', component: DownloadComponent },
  { path: '**', redirectTo: '' }
];
