# MeetMind OS

MeetMind OS is a voice-first AI meeting intelligence system that converts meeting conversations into summaries, tasks, decisions, risks, mood insights, and searchable meeting memory.

## Features

- Meeting transcript analysis
- AI-style summary generation
- Task, decision, risk, and mood extraction
- Qdrant-powered persistent memory
- Ask questions from past meetings
- React frontend dashboard
- Spring Boot backend API

## Tech Stack

- React.js
- Spring Boot
- Java
- Qdrant Vector Database
- Omi-ready voice workflow
- Lyzr-ready orchestration layer

## Project Flow

User Transcript → Spring Boot API → AI Analysis Service → Qdrant Memory → React Dashboard

## API Endpoints

POST `/api/analyze`

POST `/api/memory/ask`

GET `/api/qdrant/memories`

## How to Run

### Backend

```bash
cd Backend/Backend
./mvnw spring-boot:run