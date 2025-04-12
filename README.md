# AI Resume Critique Assistant

An AI-powered application that analyzes resumes and provides constructive feedback to help job seekers improve their resumes.

## Features

- Upload and analyze resumes in PDF format
- Get AI-powered feedback on resume content, formatting, and structure
- Receive actionable suggestions for improvement
- Modern and user-friendly interface

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

## Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd ai-resume-critique-assistant
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenAI API key:
```
PORT=3000
OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
├── client/           # Frontend React application
├── server/           # Backend Express server
├── .env              # Environment variables
├── .gitignore        # Git ignore file
└── README.md         # Project documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Angular](https://angular.io/)
- [Express](https://expressjs.com/)
- [Cursor AI](https://cursor.sh/)
- [Angular Material](https://material.angular.io/)
