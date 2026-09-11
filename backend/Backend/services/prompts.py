from ..prompt import SYSTEM_PROMPT


def build_user_prompt(message, context=''):
    if not context:
        return message

    return (
        f'Previous conversation context:\n{context}\n\n'
        f'Current question: {message}\n\n'
        'Please respond to the current question while considering the context. '
        'Provide detailed, informative responses about bronze, its history, '
        'properties, and uses. If the user asks about something mentioned in '
        'the context, expand on that topic.'
    )


__all__ = ['SYSTEM_PROMPT', 'build_user_prompt']