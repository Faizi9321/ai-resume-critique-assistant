import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

interface Message {
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, ReactiveFormsModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  resumeContent: string = '';

  messages: Message[] = [];
  messageControl = new FormControl('', [Validators.required]);
  loading = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // Get resume content from router state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.resumeContent = navigation.extras.state['resumeContent'] || '';
    }
    this.addWelcomeMessage();
  }

  private addWelcomeMessage() {
    this.messages.push({
      type: 'assistant',
      content: 'Hello! I\'m your AI Resume Assistant. How can I help you improve your resume today?',
      timestamp: new Date()
    });
  }

  sendMessage() {
    if (this.messageControl.invalid || this.loading) return;

    const userMessage = this.messageControl.value;
    this.messages.push({
      type: 'user',
      content: userMessage!,
      timestamp: new Date()
    });

    this.messageControl.reset();
    this.loading = true;

    // Create context from previous messages
    const context = this.messages
      .slice(-4) // Get last 4 messages for context
      .map(msg => `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');

    this.http.post('/api/chat', {
      message: userMessage,
      context: context,
      resumeContent: this.resumeContent
    }).subscribe({
      next: (response: any) => {
        this.messages.push({
          type: 'assistant',
          content: response.reply,
          timestamp: new Date()
        });
        this.loading = false;
        this.scrollToBottom();
      },
      error: (error) => {
        this.messages.push({
          type: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date()
        });
        this.loading = false;
        console.error('Chat error:', error);
      }
    });
  }

  private scrollToBottom() {
    setTimeout(() => {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }, 100);
  }

  getQuickActions() {
    return [
      'Rephrase my experience statements',
      'Add relevant keywords for software engineering',
      'Improve readability',
      'Optimize for ATS',
      'Suggest better action verbs'
    ];
  }

  useQuickAction(action: string) {
    this.messageControl.setValue(action);
    this.sendMessage();
  }
}
