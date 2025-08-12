# Environment Variables Setup

This project uses environment variables to manage sensitive configuration. Follow these steps to set up your environment:

## Required Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Authentication
AUTH_TOKEN_NAME=auth_token
NEXT_PUBLIC_API_BASE_URL=https://api-yeshtery.dev.meetusvr.com/v1
```

## Development

1. Copy the example values above into your `.env.local` file
2. Update the values as needed for your environment
3. The application will automatically load these variables in development

## Production

For production, set these environment variables in your hosting provider's configuration panel.

## Available Variables

- `AUTH_TOKEN_NAME`: Name of the authentication cookie (default: 'auth_token')
- `NEXT_PUBLIC_API_BASE_URL`: Base URL for API requests (default: 'https://api-yeshtery.dev.meetusvr.com/v1')
