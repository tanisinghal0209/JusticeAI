# JusticeAI - Future Architecture Roadmap

This document outlines the architectural pathways reserved for the future scaling of the JusticeAI platform. The foundational Next.js 15 App Router, Clerk Authentication, Prisma ORM, and highly modular Shadcn/Tailwind UI have been designed to seamlessly integrate the following upcoming modules.

---

## 1. AI Voice Lawyer & Regional Language Expansion
**Objective**: Overcome literacy and linguistic barriers in rural India.
- **Architecture**: 
  - Integration with **OpenAI Whisper API** (or Bhashini) for real-time speech-to-text in regional languages (Hindi, Tamil, Telugu, Marathi).
  - Implementation of **ElevenLabs / Google Cloud TTS** for voice generation.
  - State management for streaming voice responses built on top of the existing `ai/page.tsx` chat module.

## 2. Judgment Search Engine
**Objective**: A fast, semantic search engine for Supreme Court and High Court judgments.
- **Architecture**:
  - Migration of the existing RAG mock to a production **Vector Database** (e.g., Pinecone or Milvus).
  - Indexing of Indian Kanoon data using **text-embedding-3-small**.
  - A new dedicated route `/dashboard/judgments` utilizing the existing `LawExplorer` UI grid pattern.

## 3. Verified Lawyer Marketplace
**Objective**: Connect users with vetted advocates for formal representation.
- **Architecture**:
  - Two-sided marketplace extension in `schema.prisma` adding `LawyerProfile`, `Consultation`, and `Review` models.
  - Real-time chat integration utilizing **Pusher** or **Socket.io**.
  - Payment gateway integration via **Razorpay** or **Stripe** for booking consultation slots.

## 4. Court Date Tracker & Legal Expense Calculator
**Objective**: Keep users updated on hearings and potential costs.
- **Architecture**:
  - Extension of the `Case Timeline` UI component.
  - Integration with the **eCourts API** (via webhooks or daily chron jobs) to auto-sync hearing dates.
  - Financial modeling rules engine for the Legal Expense Calculator based on historical case cost averages.

## 5. AI Evidence Organizer
**Objective**: Automatically sort, index, and timeline raw evidence.
- **Architecture**:
  - Enhancement of the existing `Document Center` OCR pipeline to include image recognition (e.g., AWS Rekognition or GPT-4o Vision).
  - Automated chronological extraction engine mapping data directly into the `CaseDetail` Timeline component.

## 6. WhatsApp Integration
**Objective**: Allow users to access the AI Lawyer without downloading an app.
- **Architecture**:
  - **Twilio / Meta WhatsApp Business API** webhooks pointing to Next.js API Routes (`/api/whatsapp/webhook`).
  - Conversation state persisted in PostgreSQL (Prisma) to maintain session continuity between the web dashboard and WhatsApp.

## 7. Mobile App Transition
**Objective**: A native experience on iOS and Android.
- **Architecture**:
  - Current web components are tightly encapsulated (UI separate from logic) to allow easy migration to **React Native (Expo)**.
  - Shared backend API routes via Next.js server actions.
