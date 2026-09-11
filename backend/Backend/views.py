import json

from django.http import JsonResponse, StreamingHttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .services.gemini import GeminiService


def stream_event(event_type, content=''):
    return json.dumps({'type': event_type, 'content': content}) + '\n'

@csrf_exempt
@require_http_methods(["POST"])
def chat_stream(request):
    try:
        data = json.loads(request.body)
        user_message = data.get('message', '').strip()
        context = data.get('context', '').strip()
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    if not user_message:
        return JsonResponse({'error': 'No message provided'}, status=400)

    def generate_response():
        try:
            for chunk in GeminiService().stream(user_message, context):
                yield stream_event('chunk', chunk)
            yield stream_event('done')
        except ImportError:
            yield stream_event(
                'error',
                'Google Generative AI package is not installed. '
                'Run: pip install google-generativeai',
            )
        except Exception as error:
            yield stream_event('error', str(error))

    return StreamingHttpResponse(
        generate_response(),
        content_type='application/x-ndjson',
    )
