#!/usr/bin/env python3
"""
Test script to verify Gemini API and Google Search functionality
"""
import os
import sys
from pathlib import Path

# Add the backend directory to the path
sys.path.insert(0, str(Path(__file__).parent))

# Configure Django settings before importing anything else
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

from dotenv import load_dotenv
from google import genai
from google.genai import types

# Load environment variables
env_path = Path(__file__).parent / '.env'
load_dotenv(env_path)

def test_gemini_connection():
    """Test basic Gemini API connection"""
    api_key = os.getenv('GEMINI_API_KEY')
    if not api_key or api_key == 'your_gemini_api_key_here' or len(api_key) < 10:
        print("❌ GEMINI_API_KEY not configured in .env file")
        print(f"Current API key value: {api_key[:10] if api_key else 'None'}...")
        return False
    
    try:
        client = genai.Client(api_key=api_key)
        print("✅ Gemini client created successfully")
        return True
    except Exception as e:
        print(f"❌ Failed to create Gemini client: {e}")
        return False

def test_google_search():
    """Test Google Search functionality"""
    api_key = os.getenv('GEMINI_API_KEY')
    if not api_key or api_key == 'your_gemini_api_key_here' or len(api_key) < 10:
        print("❌ GEMINI_API_KEY not configured")
        return False
    
    try:
        client = genai.Client(api_key=api_key)
        
        # Test Google Search with a simple query
        response = client.models.generate_content(
            model='gemini-3.6-flash',
            contents='What is the current date?',
            config=types.GenerateContentConfig(
                tools=[types.Tool(google_search=types.GoogleSearch())],
            ),
        )
        
        print("✅ Google Search test completed")
        print(f"Response: {response.text[:100]}...")
        return True
    except Exception as e:
        print(f"❌ Google Search test failed: {e}")
        return False

def test_service_integration():
    """Test the GeminiService integration"""
    try:
        import django
        django.setup()
        from Backend.services.gemini import GeminiService
        
        service = GeminiService()
        print("✅ GeminiService instantiated successfully")
        
        # Test streaming
        test_message = "Hello, can you help me?"
        chunks = list(service.stream(test_message))
        
        if chunks:
            print(f"✅ Streaming test successful - received {len(chunks)} chunks")
            print(f"Sample response: {''.join(chunks[:2])}...")
            return True
        else:
            print("❌ Streaming test failed - no chunks received")
            return False
    except Exception as e:
        print(f"❌ Service integration test failed: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == '__main__':
    print("Testing Gemini API Migration and Google Search\n")
    print("=" * 50)
    
    results = []
    
    print("\n1. Testing Gemini Connection...")
    results.append(test_gemini_connection())
    
    print("\n2. Testing Google Search...")
    results.append(test_google_search())
    
    print("\n3. Testing Service Integration...")
    results.append(test_service_integration())
    
    print("\n" + "=" * 50)
    if all(results):
        print("✅ All tests passed!")
        sys.exit(0)
    else:
        print("❌ Some tests failed")
        sys.exit(1)
