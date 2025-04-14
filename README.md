# AI Resume Critique Assistant

An intelligent web application that helps users improve their resumes through AI-powered analysis and personalized feedback. Built with Angular and powered by Google's Gemini AI.

## Features

- **Resume Analysis**: Upload your resume (PDF, DOCX, or TXT) for comprehensive analysis
- **AI-Powered Feedback**: Get detailed feedback on:
  - Content quality and relevance
  - Formatting and structure
  - Readability and impact
- **Interactive Chat**: Chat with an AI assistant for personalized resume improvement suggestions
- **Quick Actions**: Get instant feedback on specific aspects of your resume
- **Download Options**: Export your resume in PDF format

## Tech Stack

- **Frontend**: Angular 17, Angular Material
- **Backend**: Node.js, Express
- **AI Integration**: Google Gemini AI
- **File Processing**: PDFKit, pdf-parse, docx
- **Styling**: SCSS, Material Design

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Google Gemini API Key

## Setup

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd ai-resume-critique-assistant
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd server
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the server directory:
   ```
   PORT=3000
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Start the development server**
   ```bash
   # Start the backend server
   cd server
   npm start

   # In a new terminal, start the frontend
   npm start
   ```

## Usage

1. **Upload Resume**
   - Click the "Upload Resume" button
   - Select your resume file (PDF, DOCX, or TXT)
   - Wait for the AI analysis

2. **View Analysis Results**
   - Review your overall score
   - Check section-specific feedback
   - Read improvement suggestions

3. **Chat with AI Assistant**
   - Click "Chat" to start a conversation
   - Ask specific questions about your resume
   - Get personalized improvement suggestions

4. **Quick Actions**
   - Use predefined questions for common resume concerns
   - Get instant feedback on specific aspects

5. **Download**
   - Export your resume in PDF format
   - Apply suggested improvements

## Project Structure

```
ai-resume-critique-assistant/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── analysis/
│   │   │   ├── chat/
│   │   │   ├── upload/
│   │   │   └── download/
│   │   ├── services/
│   │   └── app.module.ts
│   └── styles.scss
├── server/
│   ├── index.js
│   └── package.json
└── package.json
```

## API Endpoints

- `POST /api/upload`: Upload and analyze resume
- `GET /api/upload`: Retrieve stored resume content
- `POST /api/chat`: Chat with AI assistant
- `GET /api/download`: Download resume as PDF

## Error Handling

The application includes comprehensive error handling for:
- File upload issues
- API communication errors
- Invalid file formats
- Network connectivity problems

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Gemini AI for providing the AI capabilities
- Angular team for the amazing framework
- All contributors and users of this project
